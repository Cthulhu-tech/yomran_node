import { Action, CreateType } from "../interface"

const defaultState = {
    open: false,
    callback: null,
}

const updateVisibleCreate = "update_state_visible_create"

export const visibleCreate = (state = defaultState, action:Action<string, CreateType>) => {
    switch (action.type){
        case updateVisibleCreate: 
            return {open: action.payload?.open, callback: action.payload?.callback}
        default:
            return state
    }
}

export const changeVisibleCreate = (payload: CreateType) => ({ type: updateVisibleCreate, payload })
