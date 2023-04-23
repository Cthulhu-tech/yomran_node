import { ChatList } from './chatList/chatList'
import { Create } from './create/create'
import './aside.scss'
import React from 'react'

const ChatListMemo = React.memo(ChatList)
const CreateMemo = React.memo(Create)

export const Aside = () => {

    return <aside className='aside shadow-sm border-r flex flex-col bg-white justify-between items-center'>
        <ChatListMemo/>
        <CreateMemo/>
    </aside>
}