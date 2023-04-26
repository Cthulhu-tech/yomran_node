import { setButtonPopup, setOpenPopup } from '../../../../redux/store/open'
import { setDecodeSocketIO } from '../../../../redux/store/socket'
import { JWTdecode } from '../../../../../electron/src/chat/type'
import { ElectronWindow } from '../../../../interface/electron'
import { UpdateValueHook } from '../../../../hook/updateValue'
import { IStore, PopupDefault } from '../../../../redux/type'
import { useDispatch, useSelector } from 'react-redux'
import { InputComponent } from '../../../input/input'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { validationCreate } from '../valid'
import { Popup } from '../../popup/popup'
import { CreateChatType } from '../type'
import jwt_decode from "jwt-decode"

import React, { useCallback } from 'react'

declare const window: ElectronWindow

const PopupMemo = React.memo(Popup)

export const Create = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const create = useCallback(() => {
        dispatch(setOpenPopup(true))
        dispatch(setButtonPopup({
            first_btn: 'create_room',
            last_btn: 'cancel',
        }))
    }, [])

    const popupStore = useSelector<IStore, PopupDefault<boolean>>((store) => store.PopupStore)

    const { state, callback, error } = UpdateValueHook<CreateChatType>({
        password: '',
        name:'',
    }, validationCreate)

    const _create = useCallback( async () => {
        const data = await window.api.create_chat({chat_name: state.name, password: state.password})
        console.log(data)
        const decodedJWT: JWTdecode = jwt_decode(data)

        dispatch(setDecodeSocketIO(decodedJWT))

        navigate('socket')
     }, [state])

    return  <>
    {(popupStore.open && popupStore.first_btn === 'create_room') && 
    <PopupMemo callback={_create} error={error}>
        <div className='w-full'>
            <InputComponent error={error.name} placeholder='room_name' name="name" type="text" value={state.name} change={callback}/>
            <InputComponent error={error.password} placeholder='room_password' name="password" type="password" value={state.password} change={callback}/>
        </div>
    </PopupMemo>}
    <button onClick={create} className="w-56 mb-4 mt-4 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 transition rounded-lg group bg-indigo-200 hover:bg-indigo-500">
        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md hover:text-slate-50">
            { t('create') }
        </span>
    </button>
    </>
}
