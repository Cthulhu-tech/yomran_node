import { StoreData } from '../../redux/interface'
import { useWindow } from '../../hook/useWindow'
import { useSelector } from 'react-redux'
import '../../style/animation-style.scss'
import { Popup } from '../popup/popup'
import { useEffect } from 'react'
import { Header } from "./header"
import { Footer } from "./footer"
import { Aside } from "./aside"
import { Title } from './title'
import { Main } from "./main"
import './layout.scss'

export const Layout = () => {

    const wide = useWindow(760)
    const openAside = useSelector((store: StoreData) => store.visibleAside.open)
    const openPopup = useSelector((store: StoreData) => store.visiblePopup.open)

    useEffect(() => {}, [wide, openAside, openPopup])

    return <div className='grid'>
        <Title/>
        <Header />
        {openPopup && <Popup />}
        {(openAside || wide) && <Aside />}
        <Main />
        <Footer />
    </div>
}