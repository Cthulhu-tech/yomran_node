import { changeVisibleAside } from "../redux/store/aside"
import { useDispatch, useSelector } from "react-redux"
import { StoreData } from "../redux/interface"
import { useParams } from "react-router-dom"
import { useEffect } from 'react'

export const Room = () => {

    const dispatch = useDispatch()
    const { roomName } = useParams()
    const openAside = useSelector((store: StoreData) => store.visibleAside.open)

    useEffect(() => {openAside && dispatch(changeVisibleAside(false))}, [openAside, dispatch])

    return <>{roomName}</>
}