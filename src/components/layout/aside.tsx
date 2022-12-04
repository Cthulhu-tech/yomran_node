import { StoreData } from '../../redux/interface'
import { useWindow } from '../../hook/useWindow'
import { Create } from '../create/create'
import { useSelector } from 'react-redux'
import { Button } from './button/button'
import { Rooms } from "./rooms/rooms"
import '../../style/shadow.scss'

export const Aside = () => {

    const wide = useWindow(760)
    const openCreate = useSelector((store: StoreData) => store.visibleCreate.open)

    return <aside className='aside_open aside'>
        <div className="burger-container">
            <div className="burger-container__wrapper-button animation-background_medium">
                <div className="burger-container__button close"/>
            </div>
        </div>
        <Button/>
        {(openCreate && !wide) ? <Create/> : <Rooms/>}
    </aside>
}