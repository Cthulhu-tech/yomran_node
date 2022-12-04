import { Action, PopupType } from "../interface"

const defaultState = {
    open: false,
    callback: null,
    message: '',
    leftButton: '',
    rigthtButton: '',
}

const updateVisiblePopup = "update_state_visible_popup"

export const visiblePopup = (state = defaultState, action:Action<string, PopupType>) => {
    switch (action.type){
        case updateVisiblePopup: 
            return {open: !state.open, callback: action.payload?.callback, message: action.payload?.message, leftButton: action.payload?.leftButton, rightButton: action.payload?.rightButton}
        default:
            return state
    }
}

export const changeVisiblePopup = (payload: PopupType) => ({ type: updateVisiblePopup, payload })
