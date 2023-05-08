import { SocketContext } from "../../context/socketProvider"
import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useMeshRTC } from '../../hook/meshRTC'

export const Video = () => {

    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const leaveHandler = () => navigate('/')
    const [hidden, setHidden] = useState(false)

    const videoCamsHandler = useCallback(() => {
        setHidden((prevState) => {
            if(prevState) removeVideo()
            else replaceVideo()
            return !hidden
        })
    }, [hidden])

    const { connections, videoView, userJoin, removeVideo, replaceVideo, muteOrVoice } = useMeshRTC(socket)
    return <>
    <div>
        <video 
            ref={reference => reference && userJoin(reference)}
        ></video>
        <button onClick={muteOrVoice}>mute</button>
        <button onClick={videoCamsHandler}>{hidden ? 'Remove' : 'Hidden'}</button>
    </div>
    <div className='video'>
        {Object.entries(connections).map((connectArray) => {
            return <video 
                key={connectArray[0]}
                ref={reference => reference && videoView(connectArray[1], reference)}
            ></video>
        })}
    </div>
    <button onClick={leaveHandler}>leave room</button>
    </>
}
