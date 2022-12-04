import { changeVisibleAside } from '../redux/store/aside'
import { useDispatch, useSelector } from 'react-redux'
import { StoreData } from '../redux/interface'
import { useEffect } from 'react'

export const Home = () => {
    
    const dispatch = useDispatch()
    const openAside = useSelector((store: StoreData) => store.visibleAside.open)

    useEffect(() => { dispatch(changeVisibleAside(true)) }, [openAside, dispatch])

    return <section></section>
}