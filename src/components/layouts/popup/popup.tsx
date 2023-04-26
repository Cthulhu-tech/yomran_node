import { setOpenPopup, setCallbackPopup, setSubmitPopup } from "../../../redux/store/open"
import { PopupDefault } from "../../../redux/type"
import { useTranslation } from "react-i18next"
import { IStore } from "../../../redux/type"
import { FormEvent, useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { PopupType } from "./type"

export const Popup = <T,>({ children, callback, error }: PopupType<T>): JSX.Element => {

    const { t } = useTranslation()

    const dispatch = useDispatch()
    const popupStore = useSelector<IStore, PopupDefault<T>>((store) => store.PopupStore)

    const closeAndDelecteCallback = () => {
        dispatch(setOpenPopup(false))
        dispatch(setCallbackPopup<T>(() => {}))
    }

    const callbackCallAndClose = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setSubmitPopup(true))
        if(Object.keys(error).length > 0) return
        dispatch(setOpenPopup(false))
        if(typeof popupStore.callback === 'function') popupStore.callback()
    }

    useEffect(() => {
        dispatch(setCallbackPopup<T>(callback))
    }, [callback])

    return <>
        <div className="w-full h-full absolute z-10 bg-slate-50 opacity-75 top-0 left-0">
        </div>
        <section className="w-full h-full absolute flex content-center justify-center items-center z-10 top-0 left-0">
            <form onSubmit={callbackCallAndClose} className="max-w-sm rounded overflow-hidden shadow-lg w-96 h-80 absolute bg-slate-100">
                <article className="px-6 py-4 flex h-full justify-between items-center absolute content-center flex-col w-full">
                    { children }
                    <div className="flex w-full justify-between">
                        {popupStore.last_btn && <button onClick={closeAndDelecteCallback} className="w-32 mb-4 mt-4 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 transition rounded-lg group bg-indigo-200 hover:bg-indigo-500">
                            <span className="w-full relative px-5 py-1.5 transition-all ease-in duration-75 rounded-md hover:text-slate-50">
                                { t(popupStore.last_btn) }
                            </span>
                        </button>}
                        {popupStore.first_btn && <button type='submit' className="w-32 mb-4 mt-4 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 transition rounded-lg group bg-indigo-200 hover:bg-indigo-500">
                            <span className="w-full relative px-5 py-1.5 transition-all ease-in duration-75 rounded-md hover:text-slate-50">
                                { t(popupStore.first_btn) }
                            </span>
                        </button>}
                    </div>
                </article>
            </form>
        </section>
    </>
}
