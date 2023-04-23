import { crateChatType, notificationType } from './src/interface/interface'
import { contextBridge, ipcRenderer } from 'electron'
import { Chat } from './src/sql/entity/chat'

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
    }
})
