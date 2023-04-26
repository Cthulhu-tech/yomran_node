import { setButtonPopup, setOpenPopup } from '../../../redux/store/open'
import { CreateUser } from '../../createUser/createUserComponent'
import { ElectronWindow } from '../../../interface/electron'
import { ChatList } from './chatList/chatList'
import { Create } from './create/create'
import { Open } from './open/open'

import './aside.scss'

import { IStore, UserDefault } from '../../../redux/type'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { setUserData } from '../../../redux/store/user'
import React, { useCallback, useEffect } from 'react'

const CreateUserMemo = React.memo(CreateUser)
const ChatListMemo = React.memo(ChatList)
const CreateMemo = React.memo(Create)
const OpenMemo = React.memo(Open)

declare const window: ElectronWindow

export const Aside = () => {
    
    const dispatch = useDispatch()
    const user = useSelector<IStore, UserDefault>((store) => store.UserStore)

    const userPopupOpen = useCallback(() => {
        dispatch(setOpenPopup(true))
        dispatch(setButtonPopup({
            first_btn: 'next',
            last_btn: '',
        }))
    }, [])

    const getUser = async () => {
        const user = await window.api.get_user_info()
        if(user?.login) return dispatch(setUserData(user))
        userPopupOpen()
    }

    useEffect(() => {
        if(!user.user?.login) getUser()
    }, [user])

    return <>
        <aside className='aside shadow-sm rounded-md bg-slate-100 mt-2 mr-2 mb-2 ml-2 flex flex-col justify-between items-center'>
            <ChatListMemo/>
            <div className='flex flex-col'>
                {!user.user?.login && <CreateUserMemo/>}
                <CreateMemo/>
                <OpenMemo/>
            </div>
        </aside>
    </>
}
