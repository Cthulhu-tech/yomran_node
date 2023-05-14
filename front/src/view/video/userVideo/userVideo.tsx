import { UserVideoType } from "./type"

import { useEffect } from "react"

export const UserVideo = ({ userJoin, videoUser, hidden }: UserVideoType) => {

    useEffect(() => {
        if(videoUser.current)
            userJoin(videoUser.current)
    }, [videoUser])

    return <div className="h-full flex justify-center items-center">
        {hidden ?
        <div className="rounded-xl bg-slate-800 w-full"></div> :
        <video
            className="rounded-xl bg-slate-800 h-full"
            ref={videoUser}
        ></video>
        }
    </div>
}
