import { Loading } from "../loading/loading"
import { useFetch } from "../../hook/hook"
import { NavLink } from "react-router-dom"
import { ChatsType } from "./type"
import { useEffect } from "react"

export const ChatData = () => {
    const { fetchData, returnData, loading } = useFetch<undefined, ChatsType[]>('chats', 'GET', true)

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(returnData)
    }, [returnData])

    if(loading)
        return <Loading/>

    return <section>{returnData.map((chatData) => 
        <NavLink to={'chat/' + chatData.id} key={chatData.id}>
            <span>{chatData.name}</span>
        </NavLink>
    )}</section>
}
