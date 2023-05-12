import { decodeToken } from "../../utils/token/tokenDecode"
import { IAction, TokenType } from "../type"

const defaultState: TokenType = {
    access: '',
    loading: true,
    user: '',
}

export const Token = (state = defaultState, action:IAction<string, TokenType>) => {
    switch (action.type){
        case "update_token": 
            return state = {
                ...state,
                access: action.payload.access,
                loading: action.payload.loading,
                user: action.payload.user,
            }
        case "update_loading_token": 
            return state = {
                ...state,
                loading: action.payload.loading,
            }
        default:
            return state
    }
}

export const updateToken = (payload: string) => ({ 
    type: "update_token", 
    payload: {
        access: payload,
        loading: false,
        user: decodeToken(payload)?.login || ''
    },
})

export const updateLoadingToken = (payload: boolean) => ({ 
    type: "update_loading_token", 
    payload: {
        access: '',
        loading: payload,
    },
})
