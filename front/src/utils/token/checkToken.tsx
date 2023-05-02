import { TokenDecode } from "./type"
import jwt_decode from "jwt-decode"

export const checkToken = (token: string) => {
    try {
        const decodeToken = jwt_decode<TokenDecode>(token)

        if(decodeToken &&
            new Date() < new Date(
                Number(decodeToken.exp) * 1000
            )
        )
            return true
        return false
    }catch {
        return false
    }
}
