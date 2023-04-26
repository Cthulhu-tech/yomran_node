import { ChatComponent } from '../../components/chat/chatComponent'
import { Message } from '../../../electron/src/sql/entity/message'
import { ElectronWindow } from '../../interface/electron'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

declare const window: ElectronWindow

export const Chat = () => {

    let { id } = useParams()

    const [chatData, setChatData] = useState<Message[]>()

    const getChatMessage = async () => setChatData(await window.api.get_all_message_in_chat({id: Number(id)}))

    useEffect(() => { getChatMessage()}, [id])

    return <ChatComponent chatData={chatData}/>
}
