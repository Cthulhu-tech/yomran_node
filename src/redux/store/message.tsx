import { Message } from "../../../electron/src/sql/entity/message"
import { IAction, MessageDefault } from "../type"

const defaultState: MessageDefault = {
    message: [],
}

const setMessageArray = 'setMessageArray'
const setMessage = 'setMessage'

export const MessageStore = (state = defaultState, action: IAction<string, Message[] | Message>) => {
    console.log(action.payload)
    switch (action.type){
        case setMessage:
            return state = {
                ...state,
                message: [
                    ...state.message,
                    action.payload as Message
                ]
            }
        case setMessageArray: 
            return state = {
                ...state,
                message: [
                    ...state.message, ...action.payload as Message[]
                ]
            }
        default: 
            return state
    }
}

export const setMessageDataArray = (payload: Message[]) => ({ type: setMessageArray, payload })
export const setMessageData = (payload: Message) => ({ type: setMessage, payload })
