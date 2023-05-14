export type notificationType = {
    message: string
    chat: string
}

export interface userLoginType {
    login: string
}

export interface changeLanguage extends userLoginType {
    id: number
    language: string
}

export interface createRoom {
    id: number
    name: string
    password: string
}
