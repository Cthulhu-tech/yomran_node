import { combineReducers, createStore } from "redux"
import { MessageStore } from "./store/message"
import { SocketStore } from "./store/socket"
import { PopupStore } from "./store/open"
import { UserStore } from "./store/user"

export const rootReducer = combineReducers({
    PopupStore,
    SocketStore,
    MessageStore,
    UserStore,
})

export const store = createStore(rootReducer)
