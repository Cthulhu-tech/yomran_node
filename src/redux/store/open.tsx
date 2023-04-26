import { IAction, PopupButtonType, PopupDefault } from "../type"

const defaultState: PopupDefault = {
    open: false,
    callback: null,
    first_btn: 'yes',
    last_btn: 'no',
    submit: false
}

const updateOpenState = 'updateOpenState'
const updateButtonState = 'updateButtonState'
const updateCallbackState = 'updateCallbackState'
const changeSubmit = 'changeSubmit'

export const PopupStore = (state = defaultState, action: IAction<string, PopupDefault>) => {
    switch (action.type){
        case changeSubmit: 
            return state = {...state, submit: action.payload.submit}
        case updateOpenState: 
            return state = {...state, open: action.payload.open}
        case updateCallbackState: 
            return state = {...state, callback: action.payload.callback}
        case updateButtonState:
            return state = {...state, first_btn: action.payload.first_btn, last_btn: action.payload.last_btn}
    default:
        return state
    }
}

export const setOpenPopup = (payload: boolean) => ({ 
    type: updateOpenState, payload: {
        open: payload,
    } 
})

export const setCallbackPopup = <T,>(payload: (() => Promise<T>) | (() => void)) => ({ 
    type: updateCallbackState, payload: {
        callback: payload,
    }
})

export const setButtonPopup = (payload: PopupButtonType) => ({ type: updateButtonState, payload })
export const setSubmitPopup = (payload: boolean) => ({ type: changeSubmit, 
    payload: {
        submit: payload,
    } 
})
