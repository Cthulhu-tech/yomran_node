import { Server, Socket } from 'socket.io';
import { Sql } from '../../sql/sqlLite';
import { createServer } from 'http';

export class SocketServer {
    sql: Sql
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

        io.on("connection", (socket: Socket) => {
            socket.emit('hello', 'world')
        })

        httpServer.listen(port)
    }
}
