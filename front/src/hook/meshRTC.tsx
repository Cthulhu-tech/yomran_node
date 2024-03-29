import { useParams } from "react-router-dom"
import { Socket } from "socket.io-client"
import {
    RECEIVE_ANSWER,
    RECEIVE_CLIENT_JOINED,
    RECEIVE_OFFER,
    RECEIVE_ICE_CANDIDATE,
    RECEIVE_DISONECT,
    channelType
} from "./type"

import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react"
import { IStore, TokenType } from "../redux/type"
import { useSelector } from "react-redux"

export const useMeshRTC = (socket: Socket) => {

    const { id } = useParams()
    const myVideoStream = useRef<MediaStream>()
    const dataChannels = useRef<channelType<RTCDataChannel>>({})
    const peerConnections = useRef<channelType<RTCPeerConnection>>({})
    const [connections, setConections] = useState<channelType<RTCPeerConnection>>({})

    const token = useSelector<IStore, TokenType>((store) => store.Token)

    const offerOptions = useMemo(() => {
        return {
            offerToReceiveVideo: true,
            offerToReceiveAudio: true
        }
    },[])

    const sendMessage = (message: string) => {
        Object.values(dataChannels.current).forEach((channel) => {
            channel.send(message)
        })
    }

    const removeVideo = () => {
        Object.values(connections).forEach((connection) => {
            connection.getSenders().forEach((sendner) => {
                if (sendner.track?.kind === "video") connection.removeTrack(sendner)
            })
        })
        sendMessage('video-stop')
    }

    const replaceVideo = async () => {
        await navigator.mediaDevices.getUserMedia(await getContains())
            .then((stream) => {
                const [videoTrack] = stream.getVideoTracks()
                Object.values(connections).forEach((connection) => {
                    connection.getSenders().forEach((sendner) => {
                        if (sendner.track === null || sendner.track.kind === "video") 
                            sendner.replaceTrack(videoTrack)
                    })
                })
            })
    }

    const audioHandler = async (on: boolean, userVideo: HTMLVideoElement | null) => {
        if (!on) {
            if(myVideoStream.current) myVideoStream.current.getAudioTracks().forEach((track) => {
                track.enabled = true
            })
            if(userVideo) userVideo.muted = false
            console.log("Turning on microphone", myVideoStream.current && myVideoStream.current.getAudioTracks()[0])
        } else {
            if(myVideoStream.current) myVideoStream.current.getAudioTracks().forEach((track) => {
                track.enabled = false
            })
            if(userVideo) userVideo.muted = true
            console.log("Turning off microphone", myVideoStream.current && myVideoStream.current.getAudioTracks()[0])
        }
    }

    const updateRef = (newData?: channelType<RTCPeerConnection>) => {
        if(newData) peerConnections.current = {...peerConnections.current, ...newData || {}}
        else peerConnections.current = {...peerConnections.current}
        setConections(peerConnections.current)
    }

    const initiateDataChannel = (peerConnection: RTCPeerConnection, user: string) => {
        const dataChannel = peerConnection.createDataChannel(user)
        dataChannel.onopen = () => {
            dataChannel.onmessage = (message) => {
                console.log(`ondatachannel onmessage (initiateDataChannel) ${message.data}`)
            }
        }
        dataChannels.current[user] = dataChannel
    }

    const getContains =() => {
        return navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const cams = devices.filter(device => device.kind === "videoinput")
            const constraints = { video: {}, audio: true }
            if(cams.length > 0)
                constraints.video = {
                    video: {
                        width: {
                          min: 0,
                          ideal: 1920,
                          max: 2560,
                        },
                        height: {
                          min: 0,
                          ideal: 1080,
                          max: 1440,
                        },
                        facingMode: 'user',
                    },
                }
            else constraints.video = false

            return constraints
        })
    }

    const userJoin = async (localVideo: HTMLVideoElement) => {
        navigator.mediaDevices
            .getUserMedia(await getContains())
            .then((stream) => {
                console.log(stream)
                myVideoStream.current = stream
                localVideo.srcObject = stream
                localVideo.autoplay = true
            })
    }

    const getStream = async (peerConnection: RTCPeerConnection) => {
        const streams = await navigator.mediaDevices.getUserMedia(await getContains())
        await Promise.all(streams.getTracks().map(track => peerConnection.addTrack(track, streams)))
    }
    const initiateSignaling = async ( peerConnection: RTCPeerConnection, user: string) => {
        initiateDataChannel(peerConnection, user)
        await peerConnection.createOffer(offerOptions)
        .then(async (offer) => {
                await peerConnection.setLocalDescription(offer)
                console.log(`send offer to ${user}`)
                socket.emit('SEND_OFFER', { offer, user })
            },
            err => {
                if (err) throw err
            })
    }
    const createRTC = async (user: string, offer = false) => {
        const peerConnection = new RTCPeerConnection()
        updateRef({ [user]: peerConnection})
        if(!offer) await getStream(peerConnection)
        else {
            if(myVideoStream.current)
            await Promise.all(myVideoStream.current.getTracks()
                .map(track => {
                    if(myVideoStream.current)
                    peerConnection.addTrack(track, myVideoStream.current)
                }))
        }
        peerConnection.onicecandidate = ({ candidate }) => {
            if (candidate) {
                console.log(`send ice candidate to ${user}`)
                socket.emit('SEND_ICE_CANDIDATE', { candidate, user })
            }
        }
        return peerConnection
    }
    const sendAnswer = async (offer: RTCSessionDescriptionInit, peerConnection: RTCPeerConnection, user: string) => {
        await peerConnection.setRemoteDescription(offer)
        peerConnection.createAnswer()
            .then(async (answer) => {
                await peerConnection.setLocalDescription(answer)
                console.log(`send answer to ${user}`)
                socket.emit('SEND_ANSWER', { answer, user })
            }, (err) => {
                if (err) throw err
            })
    }
    useEffect(() => {
        
        socket.emit('JOIN_ROOM', { 
            room_id: id,
            user_id: token.id
        })
        socket.on('RECEIVE_CLIENT_JOINED', async ({ user_server_id }: RECEIVE_CLIENT_JOINED) => {
            const peerConnection = await createRTC(user_server_id, true)
            await initiateSignaling(peerConnection, user_server_id)
        })
        socket.on('RECEIVE_OFFER', async ({ offer, user }: RECEIVE_OFFER) => {
            console.log(`receive offer from ${user}`)
            const peerConnection = await createRTC(user)
            sendAnswer(offer, peerConnection, user)
            peerConnection.ondatachannel = ({ channel }) => {
                channel.onmessage = (message) => {
                    console.log(`ondatachannel onmessage ${message.data}`)
                }
                dataChannels.current[user] = channel
            }
        })
        // получить данные на отправку к подключению
        socket.on('RECEIVE_ANSWER', ({ answer, user }: RECEIVE_ANSWER) => {
            console.log(`receive answer from ${user}`)
            peerConnections.current[user].setRemoteDescription(answer)
        })
        // получить кандидатов
        socket.on('RECEIVE_ICE_CANDIDATE', ({ candidate, user }: RECEIVE_ICE_CANDIDATE) => {
            console.log(`receive ice candidate from ${user}`)
            peerConnections.current[user].addIceCandidate(candidate)
        })
        // получить данные отключения
        socket.on('RECEIVE_DISONECT', ({ user }: RECEIVE_DISONECT) => {
            delete peerConnections.current[user]
            delete dataChannels.current[user]
            updateRef()
        })
        return () => {
            socket.close()
            socket.off('RECEIVE_OFFER')
            socket.off('RECEIVE_ANSWER')
            socket.off('RECEIVE_DISONECT')
            socket.off('RECEIVE_CLIENT_JOINED')
            socket.off('RECEIVE_ICE_CANDIDATE')
        }
    }, [socket])

    const videoView = (connection: RTCPeerConnection, entity: HTMLVideoElement) => {
        console.log(entity)
        connection.ontrack = e => {
            console.log('ontrack work!')
            entity.autoplay = true
            entity.srcObject = e.streams[0]
        }
    }

    return { connections, videoView, userJoin , removeVideo, replaceVideo, audioHandler, myVideoStream }
}
