import { SocketContext } from "../../context/socketProvider"
import { useLocation, useNavigate } from "react-router-dom"
import { memo, useCallback, useContext, useRef, useState } from "react"

import { Chat } from "../../components/chat/chat"
import { UserVideo } from './userVideo/userVideo'
import { useMeshRTC } from '../../hook/meshRTC'

import './video.scss'

import { ChatIcon } from "../../components/icon/chat"
import { RecordIcon } from "../../components/icon/record"
import { MicrophoneCall } from "../../components/icon/microphoneCall"
import { MicrophoneMute } from "../../components/icon/microphoneMute"
import { VideoCameraCall } from "../../components/icon/videoCameraCall"
import { VideoCameraXMark } from "../../components/icon/videoCameraXMark"

import { useTranslation } from "react-i18next"

const MemoVideo = memo(UserVideo)
const ChatMemo = memo(Chat)

const Video = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const location = useLocation()
    const socket = useContext(SocketContext)
    
    const { connections, videoView, userJoin, removeVideo, replaceVideo, audioHandler, myVideoStream } = useMeshRTC(socket)

    const leaveHandler = useCallback(() =>{
        Object.values(connections).forEach((pc) => pc.close())
        if(myVideoStream.current) myVideoStream.current.getTracks().forEach( track => track.stop())
        socket.close()
        navigate('/')
    }, [connections])
    
    const videoUser = useRef<HTMLVideoElement>(null)

    const [mute, setMute] = useState(false)
    const [chat, setChat] = useState(false)
    const [hidden, setHidden] = useState(false)

    const [record, setRecord] = useState(false)

    const chatHandler = () => setChat((prevState) => !prevState)
    const recordHandler = () => setRecord((prevState) => !prevState)
    
    const video = () => {
        setHidden((prevState) => {
            if(!prevState) removeVideo()
            else replaceVideo()
            return !prevState
        })
    }

    const audio = () => {
        setMute((prevState) => {
            audioHandler(!prevState, videoUser.current)
            return !prevState
        })
    }
    
    return <div className={chat ? "bg-gray-200 h-full m-auto container_room transition-all delay-150" : "bg-gray-200 h-full m-auto container_room-full transition-all delay-150"}>
        <section className="video_user p-2">
            <MemoVideo videoUser={videoUser} hidden={hidden} userJoin={userJoin}/>
        </section>
        <div className='video_users p-2'>
            {Object.values(connections).length === 0 ? 
            <div className="w-full flex p-1 justify-center items-center flex-col h-full">
                <div className="w-full flex p-1 justify-between items-center flex-col text-center bg-white border h-full border-gray-200 rounded-lg shadow-inner dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{
                        t('waiting for your friends')
                    }</p>
                    <p>{t('by this link')}</p>
                    <p className="break-all p-1">{location?.state?.link}</p>
                </div>
            </div> :
            Object.entries(connections)
            .map((connectArray) => {
                return <video
                    className="rounded-xl bg-slate-800 h-full"
                    key={connectArray[0]}
                    ref={reference => reference && videoView(connectArray[1], reference)}
                ></video>
            })}
        </div>
        {chat && <ChatMemo socket={socket}/>}
        <div className={
            chat ?
            "input_control bg-white flex items-center justify-between p-5 rounded-bl-[20px] m-auto w-full h-full shadow-inner" :
            "input_control bg-white flex items-center justify-between p-5 rounded-bl-[20px] rounded-br-[20px] m-auto w-full h-full shadow-inner"
        }>
            <div className="flex controll_button h-full items-center justify-center m-auto">
                <div
                    onClick={audio}
                    className={
                        mute ?
                        'bg-rose-400 w-16 h-16 rounded-full flex items-center justify-center m-1 cursor-pointer hover:shadow' :
                        'bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center m-1 cursor-pointer hover:shadow'
                    }>
                    <div 
                        className="w-6 flex h-full items-center justify-center"
                    >{!mute ? <MicrophoneCall/> : <MicrophoneMute/>}</div>
                </div>
                <div
                    onClick={video}
                    className={
                        hidden ?
                        'bg-rose-400 w-16 h-16 rounded-full flex items-center justify-center m-1 cursor-pointer hover:shadow' :
                        'bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center m-1 cursor-pointer hover:shadow'
                    }>
                    <div 
                        className="w-6 flex h-full items-center justify-center"
                    >{!hidden ? <VideoCameraCall/> : <VideoCameraXMark/>}</div>
                </div>
                <div 
                    onClick={recordHandler}
                    className={
                        !record ?
                        'bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center m-1 cursor-pointer hover:shadow' :
                        'bg-red-100 w-16 h-16 rounded-full flex items-center justify-center m-1 cursor-pointer hover:shadow'
                    }>
                    <RecordIcon/>
                </div>
                <div 
                    onClick={chatHandler}
                    className='bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center m-1 cursor-pointer hover:shadow'>
                    <div className="w-6 flex h-full items-center justify-center">
                        <ChatIcon/>
                    </div>
                </div>
            </div>
            <button
                onClick={leaveHandler}
                className="btn_exit h-12 select-none w-28 bg-rose-400 hover:bg-rose-600 duration-150 text-white font-bold rounded-full capitalize cursor-pointer"
            >
                { t('End call') }
            </button>
        </div>
    </div>
}

export default Video
