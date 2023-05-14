import { updateMessages } from "../../redux/message/message"
import { IStore, MessagesType } from "../../redux/type"
import { useFetch } from "../../hook/hook"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { ChatId,  } from "./type"
import { useEffect } from "react"

export const ChatMessage = ({ chatId }: ChatId) => {

    const dispatch = useDispatch()
    const userId = useSelector<IStore, number | null>((store) => store.Token.id)
    const messageList = useSelector<IStore, MessagesType>((store) => store.Messages)
    const { fetchData, returnData } = useFetch<undefined, MessagesType>('chats/' + chatId, 'GET', true)

    useEffect(() => {
        if(chatId) fetchData()
    }, [chatId])

    useEffect(() => {
        if(returnData) dispatch(updateMessages(returnData))
    }, [returnData])

    return <div className="chat-messages border-solid border-2 border-gray-200 w-full bg-slate-100 rounded-lg overflow-auto p-5">{messageList?.messages?.map((msg) => {
        return msg.message_creater.id !== userId ?
        <div key={msg.id} className="flex w-full mt-2 space-x-3 max-w-xs justify-end">
            <div className="w-full flex flex-col">
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">{msg.message}</p>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-gray-500 m-2 text-end">{msg.message_creater.login}</span>
                    <span className="text-xs text-gray-500 m-2 text-end">{new Date(msg.create_time).toLocaleTimeString()}</span>
                </div>
            </div>
        </div> :
        <div key={msg.id} className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div className="w-full flex flex-col">
                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">{msg.message}</p>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-gray-500 m-2 text-end">{msg.message_creater.login}</span>
                    <span className="text-xs text-gray-500 m-2 text-end">{new Date(msg.create_time).toLocaleTimeString()}</span>
                </div>
            </div>
        </div>}
    )}</div>
}
