import { crateChatType, notificationType } from './src/interface/interface'
import { contextBridge, ipcRenderer } from 'electron'

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
    }
})
