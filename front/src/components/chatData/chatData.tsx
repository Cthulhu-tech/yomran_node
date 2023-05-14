import { ChatMessage } from "../chatMessage/chatMessage"
import { ChatsType, IStore } from "../../redux/type"
import { memo, useEffect, useState } from "react"
import { ChatId } from "../chatMessage/type"
import { useFetch } from "../../hook/hook"
import { DeleteChat } from "./delete"

import { updateChatList } from "../../redux/chatList/chatList"

import './chatData.scss'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

const ChatMessageMemo = memo(ChatMessage)
const DeleteChatMemo = memo(DeleteChat)

export const ChatData = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const messageList = useSelector<IStore, ChatsType[]>((store) => store.ChatList)
    const { fetchData, returnData } = useFetch<undefined, ChatsType[]>('chats', 'GET', true)

    const [id, setChatId] = useState<ChatId>({ chatId: null })

    const chatIdHandler = (id: number) => setChatId({ chatId: id })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if(returnData.length > 0) dispatch(updateChatList(returnData))
    }, [returnData])

    return <section className="chat-data">
        <div className="chat-list w-full overflow-auto">
            <div className="py-3 m-2 sm:py-4 pl-2 pr-2 rounded-lg shadow bg-white">
                <p>{ t('Chats list') }</p>
            </div>
            {messageList.length > 0 ?
                <ul>{messageList.map((chatData) => 
                <li 
                    className="py-3 m-2 sm:py-4 pl-2 pr-2 cursor-pointer rounded-lg shadow bg-white" 
                    key={chatData.id}
                    onClick={() => chatIdHandler(chatData.id)}
                >
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {chatData.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    { t('Creater') + ': ' + chatData.chat_creater.login}
                                </p>
                                <div className="flex w-full justify-between object-center">
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {new Date(chatData.create_time).toLocaleString()}
                                    </p>
                                <DeleteChatMemo id={chatData.id} />
                                </div>
                            </div>
                        </div>
                    </li>)}
                </ul> :
                <div className="py-3 m-2 sm:py-4 pl-2 pr-2 rounded-lg shadow bg-white">
                    <div className="flex w-full justify-between object-center">
                        <p>{ t("It's empty here") }</p>
                    <NavLink 
                        to="/create"
                        className="text-green-600 m-auto text-sm italic"
                    >{ t('Create?') }</NavLink> 
                    </div>
                </div>
            }
            </div>
        <ChatMessageMemo chatId={id.chatId}/>
    </section>
}
