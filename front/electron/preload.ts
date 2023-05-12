import { notificationType, userLoginType } from './src/interface/interface'
import { contextBridge, ipcRenderer } from 'electron'
import { User } from './src/sqllite/entities/user'

contextBridge.exposeInMainWorld('api', {
    closeAplication() {
        ipcRenderer.send('close')
    },
    minAplication() {
        ipcRenderer.send('min')
    },
    maxAplication() {
        ipcRenderer.send('max')
    },
    notification: ({ message, chat }: notificationType) => {
        ipcRenderer.send('notification', { message, chat })
    },
    getUserSetting: ({ login }: userLoginType): Promise<User | null> => {
        return ipcRenderer.invoke('getUserSetting', { login })
    },
})
