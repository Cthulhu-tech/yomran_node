import { combineReducers, createStore } from "redux"
import { Token } from './token/token'

export const rootReducer = combineReducers({
    Token
})

export const store = createStore(rootReducer)
