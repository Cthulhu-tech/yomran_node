import { JWTdecode } from "../../../electron/src/chat/type"
import { IAction, UserDefault, UserType } from "../type"

const defaultState: UserDefault = {
    user: null,
}

const setUserSocket = 'setUserSocket'

export const UserStore = (state = defaultState, action: IAction<string, UserType>) => {
    switch (action.type){
        case setUserSocket:
            return state = {
                user: {
                    ...state.user,
                    ...action.payload,
                }
            }
    default:
        return state
    }
}

export const setUserData = (payload: UserType) => ({ type: setUserSocket, payload })
