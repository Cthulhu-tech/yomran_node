import { deleteChatList } from "../../redux/chatList/chatList"
import { useTranslation } from "react-i18next"
import { useFetch } from "../../hook/hook"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

export const DeleteChat = ({ id }: { id: number }) => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { fetchData, returnData } = useFetch<undefined, { message: string }>('chats/' + id, 'DELETE', true)
    
    const deleteChat = () => fetchData()

    useEffect(() => {
        if(returnData.message === 'Chat delete') dispatch(deleteChatList(id))
        
    }, [returnData])

    return <p
        onClick={deleteChat}
        className="text-sm text-red-500 truncate dark:text-gray-400 uppercase cursor-not-allowed"
    >
        { t('delete') }
    </p>
}
