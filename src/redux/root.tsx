import { combineReducers, createStore } from "redux"
import { PopupStore } from "./store/open"

export const rootReducer = combineReducers({
    PopupStore,
})

export const store = createStore(rootReducer)
