import { UserVideoType } from "./type"

import { useEffect } from "react"

export const UserVideo = ({ userJoin, videoUser }: UserVideoType) => {

    useEffect(() => {
        if(videoUser.current)
            userJoin(videoUser.current)
    }, [videoUser])

    return <div className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden max-w-screen-xl h-full">
        <div className="embed-responsive-item rounded-xl bg-slate-800 absolute h-full w-full z-10"></div>
        <video
            className="embed-responsive-item rounded-xl bg-slate-800 absolute h-full w-full z-0"
            ref={videoUser}
        ></video>
    </div>
}
