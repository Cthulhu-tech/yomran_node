import {
  app,
  BrowserWindow,
  ipcMain,
} from 'electron';
import * as path from 'path';

import { Chat } from './src/chat/chat';
import {
  crateChatType,
  notificationType,
} from './src/interface/interface';
import { Message } from './src/message';
import { Sql } from './src/sql/sqlLite';

export class Window {
  private window: BrowserWindow
  private message: Message
  private sql: Sql
  constructor() {
    this.message = new Message()
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
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

    if (app.isPackaged) {
      this.window.loadURL(`file://${__dirname}/../index.html`)
      this.sql = await new Sql()
      await this.sql.initSqlLite()
    }
    else {
      this.sql = await new Sql()
      await this.sql.initSqlLite()
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
    ipcMain.on('new_message', (event, { message, chat }: notificationType) => !this.window.isFocused() && this.message.newMessageAlarm({ message, chat }))

    ipcMain.handle('create_chat', async (event, { chat_name, password }: crateChatType) => await new Chat(chat_name, password).getInfoConnect())
  }
}