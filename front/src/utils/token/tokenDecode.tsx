import jwt_decode from "jwt-decode"

export const decodeToken = (token: string) => {
    try {
        return jwt_decode<{login: string, userId: number}>(token)
    } catch {
        return {
            login : '',
            userId: null
        }
    }
}
