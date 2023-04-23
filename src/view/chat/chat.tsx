import { Message } from '../../../electron/src/sql/entity/message'
import { ElectronWindow } from '../../interface/electron'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

declare const window: ElectronWindow

export const Chat = () => {

    let { id } = useParams()

    const [chatData, setChatData] = useState<Message[]>()

    const getChatMessage = async () => setChatData(await window.api.get_all_message_in_chat({id: Number(id)}))

    useEffect(() => { getChatMessage()}, [id])

    return <section className='h-full pt-2 pb-2 pr-2 pl-2'>
        {chatData?.map((_chat, i) => {
            return _chat.sender.creater ? 
            <div key={_chat.create_time + '/' + i} className="flex w-full mt-2 mb-2 ml-auto justify-end">
                <div className='mr-2'>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">{_chat.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none select-none">{
                        new Date(_chat.create_time).toLocaleDateString() + ' ' + new Date(_chat.create_time).toLocaleTimeString()
                    }</span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 select-none items-center justify-center flex">
                    { _chat.sender.login?.charAt(0).toUpperCase()}
                </div>
            </div> :
            <div key={_chat.create_time + '/' + i} className="flex w-full mt-2 mb-2">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 select-none items-center justify-center flex">
                    { _chat.sender.login?.charAt(0).toUpperCase()}
                </div>
                <div className='ml-2'>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">{_chat.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none select-none">{
                        new Date(_chat.create_time).toLocaleDateString() + ' ' + new Date(_chat.create_time).toLocaleTimeString()
                    }</span>
                </div>
            </div>
        })}
    </section>
}