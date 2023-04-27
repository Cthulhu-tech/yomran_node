import { Message } from "../sql/entity/message"

export type notificationType = {
    message: string
    chat: string
}

export type crateChatType = {
    chat_name: string
    password: string
}

export type messageIdType = {
    id: number
}

export type SaveChat = {
    chat_name: string
    message: Message[]
}

