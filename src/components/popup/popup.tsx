import { changeVisiblePopup } from "../../redux/store/popup"
import { useDispatch, useSelector } from "react-redux"
import { StoreData } from "../../redux/interface"
import { useEffect } from "react"
import './popup.scss'

export const Popup = () => {

    const dispatch = useDispatch()
    const popupState = useSelector((store: StoreData) => store.visiblePopup)

    useEffect(() => {}, [popupState])

    const callbackHandler = () => {
        popupState.callback()
        close()
    }

    const close = () => dispatch(changeVisiblePopup({
        open: popupState.open, 
        callback: () => {}, 
        message: '',
        leftButton: 'Да',
        rightButton: 'Нет'
    }))

    return <div className="popup-container">
        <section className="popup">
            <p className="room__message_name popup-message">{popupState.message}</p>
            <div className="button-container button-container_column">
                <button className="button-create" onClick={callbackHandler}>{popupState.leftButton}</button>
                <button className="button-create" onClick={close}>{popupState.rightButton}</button>
            </div>
        </section>
    </div>
}