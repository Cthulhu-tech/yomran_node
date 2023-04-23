import { crateChatType, notificationType } from '../../electron/src/interface/interface'
import { Chat } from '../../electron/src/sql/entity/chat'

export interface ElectronWindow extends Window {
    api: {
        closeAplication: ()  => void
        minAplication: ()  => void
        maxAplication: ()  => void
        notification: ({ message, chat }: notificationType) => void
        create_chat: ({ chat_name, password }: crateChatType) => Promise<string>
        get_all_chat_info: () => Promise<Chat[]>
    }
}