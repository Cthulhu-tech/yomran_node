import { crateChatType, messageIdType, notificationType } from './src/interface/interface'
import { contextBridge, ipcRenderer } from 'electron'
import { Message } from './src/sql/entity/message'
import { Chat } from './src/sql/entity/chat'
import { User } from './src/sql/entity/user'
import { UserCreateType } from './src/chat/type'

contextBridge.exposeInMainWorld('api', {
    closeAplication() {
        ipcRenderer.send('close');
    },
    minAplication() {
        ipcRenderer.send('min');
    },
    maxAplication() {
        ipcRenderer.send('max');
    },
    notification: ({ message, chat }: notificationType) => {
        ipcRenderer.send('new_message', { message, chat })
    },
    create_chat: async ({ chat_name, password }: crateChatType) => {
        return await ipcRenderer.invoke('create_chat', { chat_name, password })
    },
    get_all_chat_info: async (): Promise<Chat[]> => {
        return await ipcRenderer.invoke('get_all_chat_info')
    },
    get_all_message_in_chat: async (message: messageIdType): Promise<Message[]> => {
        return await ipcRenderer.invoke('get_all_message_in_chat', message)
    },
    delete_chat_by_id: async (message: messageIdType): Promise<boolean> => {
        return await ipcRenderer.invoke('delete_chat_by_id', message)
    },
    create_user_info: async ({ login }: UserCreateType): Promise<User> => {
        return await ipcRenderer.invoke('create_user_info', { login })
    },
    get_user_info: async (): Promise<User> => {
        return await ipcRenderer.invoke('get_user_info')
    },
})
