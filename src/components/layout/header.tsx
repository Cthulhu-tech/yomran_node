import { changeVisibleAside } from '../../redux/store/aside'
import { useSelector, useDispatch } from 'react-redux'
import { StoreData } from "../../redux/interface"
import { useWindow } from '../../hook/useWindow'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'

export const Header = () => {

    const wide = useWindow(760)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const openAside = useSelector((store: StoreData) => store.visibleAside.open)

    const backHandler = () => {
        navigate('/')
        dispatch(changeVisibleAside(true))
    }

    useEffect(() => {}, [wide, openAside])

    return <header>
        {(!openAside && !wide) && <div className='header-wrapper' onClick={backHandler}>
            <div className="burger-container__wrapper-button animation-background_medium" onClick={backHandler}>
                <div className='arrow-left arrow'>
                </div>
            </div>
        </div>}
    </header>
}