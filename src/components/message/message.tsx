import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { IStore, SocketDefault, UserDefault } from "../../redux/type"
import { InputComponent } from "../input/input"
import { socketTypeMessage } from "./type"
import { useSelector } from "react-redux"

import { t } from "i18next"

export const MessageComponent = ({ socket }: socketTypeMessage) => {

    const [message, setMessage] = useState<string>('')

    const jwt = useSelector<IStore, SocketDefault>((store) => store.SocketStore)
    const user = useSelector<IStore, UserDefault>((store) => store.UserStore)

    const callback = (event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)

    const messageSend = useCallback(() => {
        socket.emit('message:post', { 
            message: message,
            login: user.user?.login,
            chat: jwt.decode?.chat_id,
            chat_name: jwt.decode?.chat_name,
        })
        setMessage('')
    }
    ,[message])

    return  <div className="w-full h-full socket-message-send flex justify-around items-center">
        <InputComponent placeholder='' name="text" type="text" value={message} change={callback}/>
        <button 
            onClick={messageSend} 
            className="w-28 h-10 ml-1 mr-1 mt-2 justify-center items-center pt-1 pb-1 pl-1 pr-1 overflow-hidden text-sm font-medium text-gray-900 transition rounded-lg group bg-indigo-200 hover:bg-indigo-500"
        >
            <span className="w-full h-full relative transition-all ease-in duration-75 rounded-md hover:text-slate-50">
                { t('send') }
            </span>
        </button>
    </div>
}
