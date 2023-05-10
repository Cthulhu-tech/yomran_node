import { RefObject } from "react"

export type UserVideoType = {
    userJoin: (localVideo: HTMLVideoElement) => Promise<void>
    removeVideo?: () => void
    replaceVideo?: () => Promise<void>
    audioHandler?: (on: boolean) => Promise<void>
    videoUser: RefObject<HTMLVideoElement>
    hidden: boolean
}