import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { MessageSocketType } from './type'
import { Server, Socket } from 'socket.io'
import { Sql } from '../../sql/sqlLite'
import { createServer } from 'http'

export class SocketServer {
    sql: Sql
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    constructor() {
        this.sql = new Sql()
    }
    createSocketServer = async (port: number) => {
        const httpServer = await createServer()

        const io = new Server(httpServer, {
            cors: {
                origin: '*'
            }
        })

        this.io = io

        io.on("connection", (socket: Socket) => {
            socket.on('message:get', ({ chat, chat_name }: MessageSocketType) => this.getMessageInChat(chat, chat_name, socket))
            socket.on('user:post', (user: string) => this.saveUser(user, socket))
            socket.on('message:post', ({ message, login, chat, chat_name }: MessageSocketType) => this.saveMessage({ message, login, chat, chat_name }, socket))
            socket.on('disconnect:post', (user: string) => this.userDisconnect(user, socket))
        })

        httpServer.listen(port)
    }
    private userDisconnect = async (user: string, socket: Socket) => {
        if(!user) return
        
        await this.io.emit('disconnect:user', user)
        socket.disconnect() 
    }
    private getMessageInChat = async (chat: number, chat_name: string, socket: Socket) => {

        const messageEntity = await this.sql.getMessageEntity()

        const allMessage = await messageEntity.find({
            relations: {
                sender: true
            },
            where: {
                chat: {
                    id: chat,
                    name: chat_name,
                }
            }
        })
        
        await socket.emit('chat:get', allMessage)
    }
    private saveUser = async (user: string, socket: Socket) => {
        const userFind = await this.getUserByName(user, socket)

        if(userFind) {
            await socket.emit('user:get-you', userFind)
            await this.io.emit('user:create', userFind)
            return
        }

        const userEntity = await this.sql.getUserEntity()

        const createUser = await userEntity.create({
            login: user,
            creater: false,
            socket: socket.id,
            ip: socket.handshake.address
        })

        await userEntity.save(createUser)
        
        await socket.emit('user:get-you', userFind)
        await this.io.emit('user:create', userFind)
    }
    private saveMessage = async ({ message, login, chat, chat_name }: MessageSocketType, socket: Socket) => {
        const messageEntity = await this.sql.getMessageEntity()

        const userFind = await this.getUserByName(login, socket)
        const chatFind = await this.getChatByNameAndId(chat, chat_name)

        if(!userFind || !chatFind) return false

        const saveMessage = await messageEntity.create({
            sender: userFind,
            text: message,
            chat: chatFind,
        })

        const messageSave = await messageEntity.save(saveMessage)

        await this.io.emit('message:create', messageSave)
    }
    private getUserByName = async (login: string, socket: Socket) => {
        const userEntity = await this.sql.getUserEntity()

        const user = await userEntity.findOneBy({
            login,
            ip: socket.handshake.address
        })
        
        return user
    }
    private getChatByNameAndId = async (chat: number, chat_name: string) => {
        const chatEntity = await this.sql.getChatEntity()

        const chatFind = await chatEntity.findOneBy({
            id: chat,
            name: chat_name
        })

        return chatFind
    }
}
