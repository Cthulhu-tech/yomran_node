import { Message } from "../../electron/src/sql/entity/message"
import { JWTdecode } from "../../electron/src/chat/type"

export interface IAction<T, P> {
    readonly type: T
    readonly payload: P
}

export interface IStore {
    PopupStore: PopupDefault
    SocketStore: SocketDefault
    MessageStore: MessageDefault
    UserStore: UserDefault
}

export interface PopupDefault<T = any> extends PopupButtonType {
    open: boolean
    callback: (() => Promise<T>) | null,
}

export type PopupButtonType = {
    first_btn: string
    last_btn: string 
}

export type SocketDefault = {
    decode: JWTdecode | null
}

export type MessageDefault = {
    message: Message[]
}

export type UserDefault = {
    user: UserType | null
}

export type UserType = {
    creater: boolean
    id: number
    login: string
    socket: string
}
