import { crateChatType, notificationType } from '../../electron/src/interface/interface'

export interface ElectronWindow extends Window {
    api: {
        closeAplication: ()  => void
        minAplication: ()  => void
        maxAplication: ()  => void
        notification: ({ message, chat }: notificationType) => void
        create_chat: ({ chat_name, password }: crateChatType) => Promise<string>
    }
}