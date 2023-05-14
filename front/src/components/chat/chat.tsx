import { ChangeEvent, useEffect, useState } from "react"
import { IStore, MessageType, TokenType } from "../../redux/type"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { socketTypeChat } from "./type"

export const Chat = ({ socket }: socketTypeChat) => {

    const { id } = useParams()
    const { t } = useTranslation()

    const [message, setMessage] = useState('')
    const [allMessage, setAllMessage] = useState<MessageType[]>([])
    const token = useSelector<IStore, TokenType>((store) => store.Token)
    const userId = useSelector<IStore, number | null>((store) => store.Token.id)
    const changeMessage = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)

    const createMessage = () => {
        if(message) socket.emit('CREATE_MESSAGE', {
            message,
            user: token.id,
            room: id,
        })
    }

    useEffect(() => {

        socket.emit('FIND_ALL_MESSAGE', { chatId: id })
        socket.on('FIND_ALL_MESSAGE', (data: {messages: MessageType[]}) => setAllMessage(data.messages))
        socket.on('CREATE_MESSAGE', (data: MessageType) => setAllMessage((prevArray) => [...prevArray, data]))

    }, [socket])

    return <aside className="container_chat h-full w-full">
        <div className="chat_name bg-white shadow-inner"></div>
        <div className="chat_text bg-gray-200 shadow-inner overflow-auto">
            <div className="chat-messages w-full overflow-auto p-5">{allMessage?.map((msg) => {
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
        </div>
        <div className="controll_chat rounded-br-[20px] shadow-inner bg-white p-2">
            <div className="flex h-full justify-center items-center">
                <input
                    onChange={changeMessage}
                    className="flex items-center h-10 w-full rounded px-3 text-sm"
                    type="text"
                    placeholder={ t("Type your message…") as string }
                />
                <button
                    onClick={createMessage}
                    className="m-2"
                >{ t('send') }</button>
            </div>
        </div>
    </aside>
}