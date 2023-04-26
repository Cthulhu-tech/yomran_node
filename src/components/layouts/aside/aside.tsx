import { ElectronWindow } from '../../../interface/electron'
import { IStore, PopupDefault } from '../../../redux/type'
import { ChatList } from './chatList/chatList'
import { Create } from './create/create'
import { Popup } from '../popup/popup'

import './aside.scss'

import React, { useCallback } from 'react'

import { setDecodeSocketIO } from '../../../redux/store/socket'
import { JWTdecode } from '../../../../electron/src/chat/type'
import { UpdateValueHook } from '../../../hook/updateValue'
import { InputComponent } from '../../input/input'
import { validationCreate } from './valid'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { CreateChatType } from './type'

import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode"

declare const window: ElectronWindow

const ChatListMemo = React.memo(ChatList)
const CreateMemo = React.memo(Create)
const PopupMemo = React.memo(Popup)

export const Aside = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const popupStore = useSelector<IStore, PopupDefault<boolean>>((store) => store.PopupStore)

    const { state, callback, error } = UpdateValueHook<CreateChatType>({
        password: '',
        name:'',
    }, validationCreate)

    const create = useCallback( async () => {
        const data = await window.api.create_chat({chat_name: state.name, password: state.password})

        const decodedJWT: JWTdecode = jwt_decode(data)

        dispatch(setDecodeSocketIO(decodedJWT))

        navigate('socket')
     }, [state])
    
    return <>
        {popupStore.open && 
        <PopupMemo callback={create}>
            <div className='w-full'>
                <InputComponent placeholder='room_name' name="name" type="text" value={state.name} change={callback}/>
                {error?.name && state.name !== error?.name && <span className='text-xs text-rose-600'>{error?.name}</span>}
                <InputComponent placeholder='room_password' name="password" type="password" value={state.password} change={callback}/>
                {error?.password && state.password !== error?.password && <span className='text-xs text-rose-600'>{error?.password}</span>}
            </div>
        </PopupMemo>}
        <aside className='aside shadow-sm rounded-md bg-slate-100 mt-2 mr-2 mb-2 ml-2 flex flex-col justify-between items-center'>
            <ChatListMemo/>
            <CreateMemo/>
        </aside>
    </>
}
