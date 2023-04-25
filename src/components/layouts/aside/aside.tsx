import { ElectronWindow } from '../../../interface/electron'
import { IStore, PopupDefault } from '../../../redux/type'
import React, { useCallback, useEffect, useState } from 'react'
import { ChatList } from './chatList/chatList'
import { Create } from './create/create'
import { Popup } from '../popup/popup'

import './aside.scss'

import { io } from 'socket.io-client'

import { UpdateValueHook } from '../../../hook/updateValue'
import { InputComponent } from '../../input/input'
import { useSelector } from "react-redux"
import { CreateChatType } from './type'

const jwt_decode = require('jwt-decode')

declare const window: ElectronWindow

const ChatListMemo = React.memo(ChatList)
const CreateMemo = React.memo(Create)
const PopupMemo = React.memo(Popup)

export const Aside = () => {

    const popupStore = useSelector<IStore, PopupDefault<boolean>>((store) => store.PopupStore)

    const { state, callback } = UpdateValueHook<CreateChatType>({
        passsword: '',
        name:'',
    })

    const create = useCallback( async () => {
        console.log(state)
    }, [state.name, state.passsword])

    
    return <>
        {popupStore.open && 
        <PopupMemo callback={create}>
            <div>
                <InputComponent placeholder='room_name' name="name" type="text" value={state.name} change={callback}/> 
                <InputComponent placeholder='room_password' name="passsword" type="password" value={state.passsword} change={callback}/>
            </div>
        </PopupMemo>}
        <aside className='aside shadow-sm rounded-md bg-slate-100 mt-2 mr-2 mb-2 ml-2 flex flex-col justify-between items-center'>
            <ChatListMemo/>
            <CreateMemo/>
        </aside>
    </>
}
