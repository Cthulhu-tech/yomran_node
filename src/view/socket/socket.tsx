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
import { setUserData } from "../../redux/store/user"

const chat = React.memo(SocketIoChat)

export const Socket = () => {

    const dispatch = useDispatch()
    const jwt = useSelector<IStore, SocketDefault>((store) => store.SocketStore)
    const user = useSelector<IStore, UserDefault>((store) => store.UserStore)

    const socket = useMemo(() => jwt.decode && io(jwt.decode.ipV4 + ':' + jwt.decode.port), [jwt.decode])

    useEffect(() => {

        if(!socket || !user.user?.login) return
        
        socket.connect()

        socket.emit('user:post', user.user?.login)
        socket.emit('message:get', { chat: jwt.decode?.chat_id, chat_name: jwt.decode?.chat_name })

        socket.on('user:create', (user: User) => {
            console.log(user)
        })

        socket.on('disconnect:user', (user: string) => {
            console.log(user)
        })

        socket.on('message:create', (message: Message) => {
            console.log(message, 'message')
            dispatch(setMessageData(message))
        })

        socket.on('user:get-you', (user: User) => {
            console.log(user, 'you')
            dispatch(setUserData(user))
        })

        socket.on('chat:get', (message: Message[]) => {
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
