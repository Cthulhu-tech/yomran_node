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

    return <div className="chat-messages">{messageList?.messages?.map((msg) => {
        return  <div key={msg.id}>
            {msg.create_time}
        </div>
    }
    )}</div>
}
