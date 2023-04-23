import { ChatList } from './chatList/chatList'
import { Create } from './create/create'
import './aside.scss'
import React from 'react'

const ChatListMemo = React.memo(ChatList)
const CreateMemo = React.memo(Create)

export const Aside = () => {

    return <aside className='h-full shadow-sm border-r flex flex-col w-64 bg-white justify-between items-center'>
        <ChatListMemo/>
        <CreateMemo/>
    </aside>
}
