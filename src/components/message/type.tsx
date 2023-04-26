import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { Socket } from "socket.io-client"

export type socketTypeMessage = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}