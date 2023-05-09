import { SocketContext } from "../../context/socketProvider"
import { useNavigate, useParams } from "react-router-dom"
import { memo, useContext, useState } from "react"

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
import { t } from "i18next"

const MemoVideo = memo(UserVideo)

export const Video = () => {

    const { link } = useParams()
    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const leaveHandler = () => navigate('/')

    const [hidden, setHidden] = useState(false)
    const [mute, setMute] = useState(false)
    const [chat, setChat] = useState(false)

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
            audioHandler(!prevState)
            return !prevState
        })
    }

    const { connections, videoView, userJoin, removeVideo, replaceVideo, audioHandler } = useMeshRTC(socket)
    
    return <div className={chat ? "bg-gray-200 p-5 m-auto container_room h-screen transition-all delay-150 max-w-screen-2xl" : "bg-gray-200 p-5 m-auto container_room-full h-screen transition-all delay-150 max-w-screen-2xl"}>
        {chat && <Chat/>}
        <section className="video_user pr-5 w-full m-auto h-full flex items-center justify-center p-5">
            <MemoVideo userJoin={userJoin}/>
        </section>
        <div className={chat ? 'pb-5 pt-5 overflow-y-auto video_users flex items-start max-w-screen-xl m-auto w-full h-full' : 'pb-5 pt-5 pr-5 overflow-y-auto h-full video_users flex items-start max-w-screen-xl m-auto w-full'}>
            {Object.values(connections).length === 0 ? 
            <div className="w-full flex justify-center items-center flex-col h-full">
                <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow-inner dark:bg-gray-800 dark:border-gray-700">
                    <p className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{
                        t('waiting for your friends')
                    }</p>
                    <p>{t('by this link')}</p>
                    <p className="w-full text-center p-3 font-bold text-gray-900 bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white select-all cursor-pointer">
                        {link}
                    </p>
                </div>
            </div> :
            Object.entries(connections)
            .map((connectArray) => {
                return <video
                    className="bg-slate-800 embed-responsive embed-responsive-16by9 relative w-96 rounded-xl overflow-hidden h-full mr-5"
                    key={connectArray[0]}
                    ref={reference => reference && videoView(connectArray[1], reference)}
                ></video>
            })}
        </div>
        <div className={
            chat ?
            "input_control bg-white flex items-center justify-between p-5 rounded-bl-[20px] max-w-screen-xl m-auto w-full h-full shadow-inner" :
            "input_control bg-white flex items-center justify-between p-5 rounded-bl-[20px] rounded-br-[20px] max-w-screen-xl m-auto w-full h-full shadow-inner"
        }>
            <div className="flex w-3/4 controll_button h-full items-center justify-center m-auto">
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
                className="btn_exit h-12 select-none bg-rose-400 hover:bg-rose-600 duration-150 text-white font-bold py-2 px-4 rounded-full capitalize w-36 cursor-pointer"
            >
                End call
            </button>
        </div>
    </div>
}
