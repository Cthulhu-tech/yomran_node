import { IAction, MessagesType } from "../type"

const defaultState: MessagesType = {
    create_time: '',
    delete: true,
    chat_creater: {
        id: 0,
        login: '',
    },
    id: 0,
    name: '',
    messages: []
}

export const Messages = (state = defaultState, action:IAction<string, MessagesType>) => {
    switch (action.type){
        case 'set_message_list':
            return state = {
                ...action.payload,
            }
        default:
            return state
    }
}

export const updateMessages = (payload: MessagesType) => ({
    type: "set_message_list",
    payload,
})
