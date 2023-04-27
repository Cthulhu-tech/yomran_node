import {
  app,
  BrowserWindow,
  ipcMain,
} from 'electron'

import * as path from 'path'

import {
  crateChatType,
  messageIdType,
  notificationType,
SaveChat,
} from './src/interface/interface'

import { UserCreateType } from './src/chat/type'
import { Message } from './src/message'
import { Sql } from './src/sql/sqlLite'
import { Chat } from './src/chat/chat'

export class Window {
  private window: BrowserWindow
  private message: Message
  private sql: Sql
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

    ipcMain.handle('create_user_info', async (event, { login }: UserCreateType) => await this.sql.createUser({ login }))
    ipcMain.handle('get_user_info', async () => await this.sql.getUser())

    ipcMain.on('new_message', (event, { message, chat }: notificationType) => !this.window.isFocused() && this.message.newMessageAlarm({ message, chat }))

    ipcMain.handle('get_all_chat_info', async () => await this.sql.getChatEntity().find())
    ipcMain.handle('get_all_message_in_chat', async (event, { id }: messageIdType) => await this.sql.getMessageEntity().find({
      relations: { chat: true, sender: true },
      where: { chat: { id } },
    }))
    ipcMain.handle('delete_chat_by_id', async (event, { id }: messageIdType) => await this.sql.getChatEntity().delete({ id }))
    ipcMain.handle('create_chat_by_name', async (event, { chat_name }: crateChatType) => {
      const find = await this.sql.getChatEntity().findOneBy({
        name: chat_name
      })
      if(find) return;

      const createChat = await this.sql.getChatEntity().create({
        name: chat_name
      })
      await this.sql.getChatEntity().save(createChat)
    })
    ipcMain.handle('get_last_message_in_chat', async (event, { chat_name }: crateChatType) => {
      return await this.sql.getMessageEntity().findOne({
        relations: { chat: true},
        where: {chat: {
            name: chat_name,
          }
        },
        order: { id: 'DESC' }
      })
    })
    ipcMain.handle('save_message_in_chat', async (event, { chat_name, message }: SaveChat) => {
      const chatEntity = await this.sql.getChatEntity()

      const findChat = await chatEntity.findOne({
        relations: {
          messages: true,
        },
        where: {
          name: chat_name,
        },
      })

      if(findChat) {
        findChat.messages.push(...message)

        return await chatEntity.save(findChat)
      }
      
      const create = await chatEntity.create({
        name: chat_name,
        messages: message,
      })
      return await chatEntity.save(create)
    })
    ipcMain.handle('create_chat', async (event, { chat_name, password }: crateChatType) => await new Chat(chat_name, password).getInfoConnect())
  }
}