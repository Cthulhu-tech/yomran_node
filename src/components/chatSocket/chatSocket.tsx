import { Message } from "../../../electron/src/sql/entity/message"
import { ChatComponent } from "../chat/chatComponent"
import { IStore } from "../../redux/type"
import { useSelector } from "react-redux"

export const SocketIoChat = () => {

    const chatData = useSelector<IStore, Message[]>((store) => store.MessageStore.message)

    return  <div className="socket-chat border-solid border-2 border-gray-200 rounded-md bg-white">
        <ChatComponent chatData={chatData}/>
    </div>

}