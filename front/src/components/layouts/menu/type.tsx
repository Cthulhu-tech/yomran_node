import { User } from "../../../../electron/src/sqllite/entities/user"

export type logoutType = {
    message: string
}

export type setting = {
    user: null | User
    language: string
}
