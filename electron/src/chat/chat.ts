import { SocketServer } from './socket/socket';
import * as portfinder from 'portfinder';
import { Nat } from '../nat';

const publicIp = require('public-ip')
const jwt = require('jsonwebtoken')

export class Chat {
    private chat_name: string
    private password: string
    private nat: Nat
    private socket: SocketServer
    constructor(chat_name: string, password: string) {
        this.chat_name = chat_name
        this.password = password
        this.nat = new Nat()
        this.socket = new SocketServer()
    }
    private GetPortFree = async () => {
        return portfinder.getPortPromise({
            port: 3000,
            stopPort: 65535
        })
    }
    getInfoConnect = async () => {
        const new_port = await this.GetPortFree()

        return await this.nat.uPnp(new_port, new_port)
        .then(async () => {
            const ipV4 = await publicIp.v4()

            await this.socketPortCreate(new_port)

            return await jwt.sign({ 
                ipV4,
                port: new_port,
                chat_name: this.chat_name,
                password: this.password 
            }, this.password) as string
        })
        .catch(() => {
            return 'error'
        })
    }

    private socketPortCreate = async (port: number) => {
        await this.socket.createSocketServer(port)
    }
}
