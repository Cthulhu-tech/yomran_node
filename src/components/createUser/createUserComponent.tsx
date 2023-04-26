import { UserCreateType } from "../../../electron/src/chat/type"
import { ElectronWindow } from "../../interface/electron"
import { UpdateValueHook } from "../../hook/updateValue"
import { InputComponent } from "../input/input"
import { Popup } from "../layouts/popup/popup"
import { useDispatch } from "react-redux"

import { setUserLoginData } from "../../redux/store/user"
import { validationCreateUser } from "./validation"
import React, { useCallback } from 'react'

declare const window: ElectronWindow

const PopupMemo = React.memo(Popup)

export const CreateUser = () => {

    const dispatch = useDispatch()

    const { state, callback, error } = UpdateValueHook<UserCreateType>({
        login: '',
    }, validationCreateUser)

    const createUserCallback = useCallback( async () => {
        const user = await window.api.create_user_info({ login: state.login })
        
        dispatch(setUserLoginData(user.login))
    }, [state])

    return  <PopupMemo callback={createUserCallback} error={error}>
        <div className="w-full h-full flex flex-col justify-center items-center">
            <InputComponent error={error?.login} placeholder='login' name="login" type="text" value={state.login} change={callback}/>
        </div>
    </PopupMemo>
}
