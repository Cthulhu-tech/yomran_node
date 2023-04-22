import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

export class SocketServer {
    constructor() {}
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
