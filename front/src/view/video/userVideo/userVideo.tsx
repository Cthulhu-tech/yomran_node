import { UserVideoType } from "./type"

import { useEffect } from "react"

export const UserVideo = ({ userJoin, videoUser, hidden }: UserVideoType) => {

    useEffect(() => {
        if(videoUser.current)
            userJoin(videoUser.current)
    }, [videoUser])

    return <div className="relative w-full overflow-hidden max-w-screen-xl m-auto">
        <div className={hidden ?
            " rounded-xl bg-slate-800 w-full z-50" :
            "rounded-xl bg-slate-800 w-full z-0"
            }></div>
        <video
            className=" rounded-xl bg-slate-800 w-full z-20"
            ref={videoUser}
        ></video>
    </div>
}
