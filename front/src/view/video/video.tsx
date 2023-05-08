import { SocketContext } from "../../context/socketProvider"
import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useMeshRTC } from '../../hook/meshRTC'
import { SpeakerWave } from "../../components/icon/speakerWave"
import { SpeakerXMark } from "../../components/icon/speakerXMark"
import { VideoCamera } from "../../components/icon/videoCamera"
import { VideoCameraXMark } from "../../components/icon/videoCameraXMark"

export const Video = () => {

    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const leaveHandler = () => navigate('/')
    const [hidden, setHidden] = useState(false)
    const [mute, setMute] = useState(false)
    
    const video = () => {
        setHidden((prevState) => {
            if(!prevState) removeVideo()
            else replaceVideo()
            return !hidden
        })
    }

    const audio = () => {
        setMute((prevState) => {
            audioHandler(!mute)
            return !mute
        })
    }

    const { connections, videoView, userJoin, removeVideo, replaceVideo, audioHandler } = useMeshRTC(socket)
    return <>
    <div>
        <video
            className="bg-slate-800 border-dotted border-2 border-indigo-600"
            ref={reference => reference && userJoin(reference)}
        ></video>
        <div 
            onClick={audio}
            className="w-6"
        >{mute ? <SpeakerWave/> : <SpeakerXMark/>}</div>
        <div 
            onClick={video}
            className="w-6"
        >{hidden ? <VideoCamera/> : <VideoCameraXMark/>}</div>
    </div>
    <div className='video'>
        {Object.entries(connections).map((connectArray) => {
            return <video
                className="bg-slate-800"
                key={connectArray[0]}
                ref={reference => reference && videoView(connectArray[1], reference)}
            ></video>
        })}
    </div>
    <button onClick={leaveHandler}>leave room</button>
    </>
}
