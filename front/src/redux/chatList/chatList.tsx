import { IAction, ChatsType } from "../type"

const defaultState: ChatsType[] = []

export const ChatList = (state = defaultState, action:IAction<string, ChatsType[]>) => {
    switch (action.type){
        case 'set_chat_list':
            return state = [...action.payload]
        default:
            return state
    }
}

export const updateChatList = (payload: ChatsType[]) => ({
    type: "set_chat_list",
    payload,
})
