import { Chat } from '../../../../../electron/src/sql/entity/chat'
import { ElectronWindow } from '../../../../interface/electron'
import { useEffect, useState } from 'react'

import { NavLink } from "react-router-dom"

declare const window: ElectronWindow

export const ChatList = () => {

    const [chat, setChat] = useState<Chat[]>()

    const getChat = async () => setChat(await window.api.get_all_chat_info())

    useEffect(() => { getChat() }, [])

    return  <section className='flex flex-col w-full'>
        <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
                <div className="flex flex-row items-center h-8">
                    <p className="text-sm font-light tracking-wide text-gray-500">Chat list</p>
                </div>
            </li>
            <li>
                {chat?.map((_chat) =>
                    <NavLink to={"/chat/" + _chat.id} key={_chat.id} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">{_chat?.name}</span>
                    </NavLink>
                )}
            </li>
        </ul>
    </section>
}