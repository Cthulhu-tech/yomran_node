import {
  app,
  BrowserWindow,
  ipcMain,
} from 'electron'

import * as path from 'path'

import {
  notificationType,
} from './src/interface/interface'

import { Message } from './src/message'

export class Window {
  private window: BrowserWindow
  private message: Message
  constructor() {
    this.message = new Message()
    this.window = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false,
      minWidth: 800,
      minHeight: 600,
      resizable: true,
      webPreferences: {
        preload: path.join(__dirname, '/preload.js')
      }
    })
  }
  public getWindow() {
    return this.window
  }
  public windowOpen = async () => {

    if (app.isPackaged) this.window.loadURL(`file://${__dirname}/../index.html`)
    else {
      this.window.loadURL('http://localhost:3000')
      this.window.webContents.openDevTools()
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname,
            '..',
            '..',
            'node_modules',
            '.bin',
            'electron' + (process.platform === "win32" ? ".cmd" : "")),
            forceHardReset: true,
            hardResetMethod: 'exit'
        })
    }
    this.handlerEvent()
  }

  private handlerEvent = () => {
    ipcMain.on('close', () => app.quit())
    ipcMain.on('min', () => this.window.minimize())
    ipcMain.on('max', () => this.window.isMaximized() ? this.window.unmaximize() : this.window.maximize())

    ipcMain.on('notification', (event, { message, chat }: notificationType) => !this.window.isFocused() && this.message.newMessageAlarm({ message, chat }))
  }
}