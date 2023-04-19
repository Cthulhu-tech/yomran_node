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
    notification: (message: string) => {
        ipcRenderer.send('new_message', message)
    }
})
