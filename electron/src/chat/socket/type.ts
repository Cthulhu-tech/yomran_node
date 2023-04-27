import { Message } from "../../sql/entity/message"

export type MessageSocketType = { 
    message: string
    login: string
    chat: number
    chat_name: string
    last_message?: Message
}
