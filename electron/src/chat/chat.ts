import { createServer } from 'http';
import * as portfinder from 'portfinder';
import {
  Server,
  Socket,
} from 'socket.io';

import { Nat } from '../nat';

const publicIp = require('public-ip')
var jwt = require('jsonwebtoken')

export class Chat {
    chat_name: string
    password: string
    nat: Nat
    constructor(chat_name: string, password: string) {
        this.chat_name = chat_name
        this.password = password
        this.nat = new Nat()
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

        const httpServer = await createServer()
        const io = new Server(httpServer, {
            cors: {
                origin: '*'
            }
        })

        io.on("connection", (socket: Socket) => {
            console.log('connection', socket)
            socket.emit('hello', 'world')
        })

        httpServer.listen(port)
    }
}