import { UserVideoType } from "./type"

import { useRef, useEffect } from "react"

export const UserVideo = ({ userJoin }: UserVideoType) => {

    const videoUser = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if(videoUser.current)
            userJoin(videoUser.current)
    }, [videoUser])

    return <div className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden max-w-screen-xl h-full">
        <video
            className="embed-responsive-item rounded-xl bg-slate-800 absolute h-full w-full"
            ref={videoUser}
        ></video>
    </div>
}
