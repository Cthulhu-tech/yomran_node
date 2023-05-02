import { IAction, TokenType } from "../type"

const defaultState: TokenType = {
    access: '',
    loading: true,
}

export const Token = (state = defaultState, action:IAction<string, TokenType>) => {
    switch (action.type){
        case "update_token": 
            return state = {
                ...state,
                access: action.payload.access,
                loading: action.payload.loading,
            }
        case "update_loading_token": 
            return state = {
                ...state,
                access: action.payload.access,
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
    },
})

export const updateLoadingToken = (payload: boolean) => ({ 
    type: "update_loading_token", 
    payload: {
        access: '',
        loading: false,
    },
})
