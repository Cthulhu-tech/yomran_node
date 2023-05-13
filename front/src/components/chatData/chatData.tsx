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

    if(loading) return <Loading/>

    return <section className="chat-data">
        <div className="chat-list">{messageList.map((chatData) => 
        <span onClick={() => chatIdHandler(chatData.id)} key={chatData.id} className="cursor-pointer">
            {chatData.name}
        </span>)}</div>
        <ChatMessageMemo chatId={id.chatId}/>
    </section>
}
