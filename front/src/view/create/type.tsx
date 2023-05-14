export type CreateType = {
    name: string
    password: string
}

export interface ChatsData {
    name: string
    chat_creater: ChatCreater
    delete: boolean
    id: number
    create_time: string
}

export interface ChatCreater {
    login: string
    email: string
    id: number
    confirmed: boolean
    create_time: string
}
