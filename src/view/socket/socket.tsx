import React, { useEffect, useMemo } from "react"
import { SocketDefault, UserDefault } from "../../redux/type"
import { useSelector } from "react-redux"
import { IStore } from "../../redux/type"

import './socket.scss'

import { io } from 'socket.io-client'

import { User } from "../../../electron/src/sql/entity/user"

import { MessageComponent } from "../../components/message/message"
import { Message } from "../../../electron/src/sql/entity/message"
import { useDispatch } from "react-redux"

import { setMessageDataArray, setMessageData } from "../../redux/store/message"
import { SocketIoChat } from "../../components/chatSocket/chatSocket"
import { ElectronWindow } from "../../interface/electron"
import { setUserData } from "../../redux/store/user"

import { Socket } from "socket.io"

declare const window: ElectronWindow

export const SocketChat = () => {

    const dispatch = useDispatch()
    const jwt = useSelector<IStore, SocketDefault>((store) => store.SocketStore)
    const user = useSelector<IStore, UserDefault>((store) => store.UserStore)

    const socket = useMemo(() => jwt.decode && io(jwt.decode.ipV4 + ':' + jwt.decode.port), [jwt.decode])

    const emit = async (socket: Socket) => {
        socket.emit('user-connection', user.user?.login)
        socket.emit('get-all-message-in-chat', { 
            chat: jwt.decode?.chat_id,
            chat_name: jwt.decode?.chat_name,
            last_message:
                await window.api.get_last_message_in_chat({
                    chat_name: jwt.decode?.chat_name as string,
                    password: jwt.decode?.password  as string,
                }) 
            })
    }

    useEffect(() => {

        if(!socket || !user.user?.login) return
        
        socket.connect()

        emit(socket as any)

        socket.on('user:create', (user: User) => { 
            console.log(user)
        })

        socket.on('disconnect:user', (user: string) => {
            console.log(user)
        })

        socket.on('message:create', (message: Message) => {
            window.api.save_message_in_chat({
                chat_name: jwt.decode?.chat_name as string,
                message: [message],
            })
            dispatch(setMessageData(message))
        })

        socket.on('user:get-you', (user: User) => {
            dispatch(setUserData(user))
        })

        socket.on('chat:get', (message: Message[]) => {
            window.api.save_message_in_chat({
                chat_name: jwt.decode?.chat_name as string,
                message,
            })
            dispatch(setMessageDataArray(message))
        })

        return () => {
            if(!socket || !user.user?.login) return

            socket.emit('disconnect:post', user.user?.login)
        }
    },[socket])

    return <section className="h-full w-full socket pr-2 pl-2 pt-2 pb-2">
        <SocketIoChat/>
        {socket && <MessageComponent socket={socket}/>}
    </section>
}
