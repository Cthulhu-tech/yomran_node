import { SocketContext } from "../../context/socketProvider"
import { useNavigate } from "react-router-dom"
import { memo, useContext } from "react"

import { useMeshRTC } from '../../hook/meshRTC'
import { UserVideo } from './userVideo/userVideo'

const MemoVideo = memo(UserVideo)

export const Video = () => {

    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const leaveHandler = () => navigate('/')

    const { connections, videoView, userJoin, removeVideo, replaceVideo, audioHandler } = useMeshRTC(socket)
    return <>
    <MemoVideo 
        userJoin={userJoin}
        removeVideo={removeVideo}
        replaceVideo={replaceVideo}
        audioHandler={audioHandler}
    />
    <div className='video'>
        {Object.entries(connections)
        .map((connectArray) => {
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
