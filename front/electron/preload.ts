import { notificationType } from './src/interface/interface'
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
        ipcRenderer.send('notification', { message, chat })
    },
})
