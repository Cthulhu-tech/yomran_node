import { StoreData } from '../../redux/interface'
import { useWindow } from '../../hook/useWindow'
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import { Create } from '../create/create'
import '../../style/shadow.scss'

export const Main = () => {

    const wide = useWindow(760)
    const openCreate = useSelector((store: StoreData) => store.visibleCreate.open)

    return <main className="shadow_left-inset">
        {(openCreate && wide) ? <Create/> : <Outlet/>}
    </main>
}