import { Chat } from '../../../../../electron/src/sql/entity/chat'
import { ElectronWindow } from '../../../../interface/electron'
import { useTranslation } from "react-i18next"
import { useEffect, useState } from 'react'

import { Trash } from '../../../icon/trash'
import { NavLink } from "react-router-dom"

declare const window: ElectronWindow

export const ChatList = () => {

    const [chat, setChat] = useState<Chat[]>()

    const { t } = useTranslation()

    const getChat = async () => setChat(await window.api.get_all_chat_info())

    const deleteChat = async (id: number) => 
        await window.api.delete_chat_by_id({id: Number(id)})
            .then(() => {
                setChat((chatData) => chatData?.filter((_chat) => _chat.id != id))
            })

    useEffect(() => { getChat() }, [])

    return  <section className='flex flex-col w-full'>
        <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
                <div className="flex flex-row items-center h-8 w-full">
                    <p className="text-sm font-light tracking-wide w-full text-gray-500 text-center pb-2 select-none">{ t('chat_list_name') }</p>
                </div>
            </li>
            <li>
                {chat?.map((_chat) =>
                    <div key={_chat.id} className="flex items-center relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <NavLink to={"/chat/" + _chat.id} className='w-full' >
                        <span className="inline-flex justify-center items-center ml-4"></span>
                        <span className="ml-2 text-sm tracking-wide truncate">{_chat?.name}</span>
                    </NavLink>
                        <div onClick={() => deleteChat(_chat.id)}>
                            <Trash  width={18} height={18}/>
                        </div>
                    </div>                    
                )}
            </li>
        </ul>
    </section>
}