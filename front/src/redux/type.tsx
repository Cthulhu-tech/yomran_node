export interface IAction<T, P> {
    readonly type: T
    readonly payload: P
}

export interface IStore {
    Token: TokenType
    ChatList: ChatsType[]
    Messages: MessagesType
}

export interface TokenRefresh {
    access: string
}

export interface TokenType extends TokenRefresh {
    loading: boolean
    user: string
    id: number | null
}

export interface ChatsType {
    create_time: string
    delete: boolean
    id: number
    name: string
}


export interface MessagesType extends ChatsType {
    messages: MessageType[]
}

export type MessageType = {
    create_time: string
    id: number
    message: string
    message_creater: MessageCreater
}

export type MessageCreater = {
    id: number
    login: string
}

