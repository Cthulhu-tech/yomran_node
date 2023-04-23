import { ChatList } from './chatList/chatList'
import { Create } from './create/create'
import './aside.scss'

export const Aside = () => {

    return <aside>
        <ChatList/>
        <Create/>
    </aside>
}