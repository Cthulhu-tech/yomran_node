import { combineReducers, createStore } from "redux"
import { ChatList } from './chatList/chatList'
import { Messages } from './message/message'
import { Token } from './token/token'

export const rootReducer = combineReducers({
    Token,
    ChatList,
    Messages
})

export const store = createStore(rootReducer)
