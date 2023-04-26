import { Message } from "../../../electron/src/sql/entity/message"
import { IStore, UserDefault } from "../../redux/type"
import { useSelector } from "react-redux"

export const ChatComponent = ({ chatData }: {chatData: Message[] | undefined}) => {

    const user = useSelector<IStore, UserDefault>((store) => store.UserStore)

    if(chatData && chatData?.length < 0) return <>is empty</>

    return <section className='h-full pt-2 pb-2 pr-2 pl-2 overflow-auto'>
        {chatData?.map((_chat, i) => {
            return (_chat.sender?.creater || (user?.user?.id === _chat?.sender?.id && user?.user?.login === _chat?.sender?.login)) ? 
            <div key={_chat.create_time + '/' + i} className="flex w-full mt-2 mb-2 ml-auto justify-end">
                <div className='mr-2'>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">{_chat?.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none select-none">{
                        new Date(_chat.create_time).toLocaleDateString() + ' ' + new Date(_chat.create_time).toLocaleTimeString()
                    }</span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 select-none items-center justify-center flex">
                    { _chat.sender?.login?.charAt(0).toUpperCase()}
                </div>
            </div> :
            <div key={_chat.create_time + '/' + i} className="flex w-full mt-2 mb-2">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 select-none items-center justify-center flex">
                    { _chat.sender?.login?.charAt(0).toUpperCase()}
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