import { applyMiddleware, combineReducers, createStore } from "redux"
import { visibleCreate } from './store/create'
import { visiblePopup } from "./store/popup"
import { visibleAside } from './store/aside'
import { roomsStore } from "./store/rooms"
import thunk from "redux-thunk"

export const rootReducer = combineReducers({
    visibleAside,
    roomsStore,
    visiblePopup,
    visibleCreate
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
