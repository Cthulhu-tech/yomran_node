import { ElectronWindow } from '../../../interface/electron'
import { ChatList } from './chatList/chatList'
import { Create } from './create/create'
import { Open } from './open/open'

import './aside.scss'

import { useDispatch } from 'react-redux'

import React, { useEffect } from 'react'

const ChatListMemo = React.memo(ChatList)
const CreateMemo = React.memo(Create)
const OpenMemo = React.memo(Open)

declare const window: ElectronWindow

export const Aside = () => {
    
    const dispatch = useDispatch()


    useEffect(() => {

    }, [])

    return <>
        <aside className='aside shadow-sm rounded-md bg-slate-100 mt-2 mr-2 mb-2 ml-2 flex flex-col justify-between items-center'>
            <ChatListMemo/>
            <div className='flex flex-col'>
                <CreateMemo/>
                <OpenMemo/>
            </div>
        </aside>
    </>
}
