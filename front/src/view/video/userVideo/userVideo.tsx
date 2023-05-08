import { UserVideoType } from "./type"
import { useState } from "react"

import { VideoCamera } from "../../../components/icon/videoCamera"
import { SpeakerWave } from "../../../components/icon/speakerWave"
import { SpeakerXMark } from "../../../components/icon/speakerXMark"
import { VideoCameraXMark } from "../../../components/icon/videoCameraXMark"

export const UserVideo = ({ removeVideo, replaceVideo, audioHandler, userJoin }: UserVideoType) => {

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

    return <div className="aspect-video w-2/3">
        <video
            className="bg-slate-800 border-dotted border-2 border-indigo-600 w-full aspect-video"
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
}
