import { JWTdecode } from "../../../electron/src/chat/type"
import { IAction, SocketDefault } from "../type"

const defaultState: SocketDefault = {
    decode: null,
}

const setDecodeSocket = 'setDecodeSocket'

export const SocketStore = (state = defaultState, action: IAction<string, JWTdecode>) => {
    switch (action.type){
        case setDecodeSocket:
            return state = {
                decode: {
                    ...state.decode,
                    ...action.payload
                }
            }
    default:
        return state
    }
}

export const setDecodeSocketIO = (payload: JWTdecode) => ({ type: setDecodeSocket, payload })
