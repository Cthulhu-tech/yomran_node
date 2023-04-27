import { crateChatType, messageIdType, notificationType, SaveChat } from '../../electron/src/interface/interface'
import { Message } from '../../electron/src/sql/entity/message'
import { UserCreateType } from '../../electron/src/chat/type'
import { Chat } from '../../electron/src/sql/entity/chat'
import { User } from '../../electron/src/sql/entity/user'

export interface ElectronWindow extends Window {
    api: {
        closeAplication: ()  => void
        minAplication: ()  => void
        maxAplication: ()  => void
        notification: ({ message, chat }: notificationType) => void
        create_chat: ({ chat_name, password }: crateChatType) => Promise<string>
        get_all_chat_info: () => Promise<Chat[]>
        get_all_message_in_chat: (id: messageIdType) => Promise<Message[]>
        delete_chat_by_id: (id: messageIdType) => Promise<Chat[]>
        create_user_info: ({ login }: UserCreateType) => Promise<User>
        get_user_info: () => Promise<User>
        create_chat_by_name: ({ chat_name }: crateChatType) => void
        get_last_message_in_chat: ({ chat_name }: crateChatType) => Promise<Message | null>
        save_message_in_chat: ({ chat_name, message }: SaveChat) => void
    }
}
