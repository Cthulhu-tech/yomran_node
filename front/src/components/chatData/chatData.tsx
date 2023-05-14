import { ChatMessage } from "../chatMessage/chatMessage"
import { ChatsType, IStore } from "../../redux/type"
import { memo, useEffect, useState } from "react"
import { ChatId } from "../chatMessage/type"
import { Loading } from "../loading/loading"
import { useFetch } from "../../hook/hook"


import './chatData.scss'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateChatList } from "../../redux/chatList/chatList"

const ChatMessageMemo = memo(ChatMessage)

export const ChatData = () => {

    const dispatch = useDispatch()
    const messageList = useSelector<IStore, ChatsType[]>((store) => store.ChatList)
    const { fetchData, returnData, loading } = useFetch<undefined, ChatsType[]>('chats', 'GET', true)

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
                                {'Creater: ' + chatData.chat_creater.login}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {new Date(chatData.create_time).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </li>)}
            </ul>
        </div>
        <ChatMessageMemo chatId={id.chatId}/>
    </section>
}
