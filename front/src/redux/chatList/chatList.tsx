import { IAction, ChatsType } from "../type"

const defaultState: ChatsType[] = []

export const ChatList = (state = defaultState, action:IAction<string, ChatsType[] | ChatsType>) => {
    switch (action.type){
        case 'set_chat_list':
            return state = [...action.payload as ChatsType[]]
        case 'delete_chat_by_id':
            return state = state.filter((chat) => chat.id !== (action.payload as ChatsType).id)
        default:
            return state
    }
}

export const updateChatList = (payload: ChatsType[]) => ({
    type: "set_chat_list",
    payload,
})

export const deleteChatList = (payload: number) => ({
    type: "delete_chat_by_id",
    payload: {
        id: payload
    },
})
