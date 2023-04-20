import { notificationType } from './interface/interface'

const path = require('path')
const { app } = require('electron')
const notifier = require('node-notifier')

export class Message {
    private ASSETS_PATH: string
    constructor() {
        this.ASSETS_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, `../../../public${path.sep}assets`)
    }
    public newMessageAlarm = ({ message, chat }: notificationType) => {
        notifier.notify({
            title: `Notification in chat ${chat}`,
            message,
            icon: path.join(this.ASSETS_PATH, 'message.png'),
            sound: true,
          });
    }
}
