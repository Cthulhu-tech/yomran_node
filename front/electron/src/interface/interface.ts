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
