import { Chat } from '../../../../../electron/src/sql/entity/chat'
import { ElectronWindow } from '../../../../interface/electron'
import { useEffect, useState } from 'react'

declare const window: ElectronWindow

export const ChatList = () => {

    const [chat, setChat] = useState<Chat[]>()

    const getChat = async () => setChat(await window.api.get_all_chat_info())

    useEffect(() => { getChat() }, [])

    return <section>
        {chat?.map((_chat) =>
            <div key={_chat.id}>
                <p>{_chat?.name}</p>
            </div>
        )}
    </section>
}