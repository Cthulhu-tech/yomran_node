import { Action } from "../interface"

const defaultState = {
    open: true
}

const updateVisible = "update_state_visible"

export const visibleAside = (state = defaultState, action:Action<string, boolean>) => {
    switch (action.type){
        case updateVisible:
            return {open: action.payload}
        default:
            return {open: state.open}
    }
}

export const changeVisibleAside = (payload: boolean) => ({ type: updateVisible, payload });