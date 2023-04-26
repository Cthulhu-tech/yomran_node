import { IStore, PopupDefault } from "../../redux/type"
import { useTranslation } from "react-i18next"
import { InputTypeComponent } from "./type"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const InputComponent = ({ type, name, value, change, placeholder, error }: InputTypeComponent) => {

    const { t } = useTranslation()

    const [blur, setBlur] = useState(false)

    const changeBlur = () => setBlur(true)
    const popupStore = useSelector<IStore, PopupDefault<Boolean>>((store) => store.PopupStore)

    useEffect(() => {

    }, [popupStore, blur, value])

    return  <div className='pt-2 pb-2 flex flex-col justify-center items-center'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t(placeholder) }</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={change}
            onBlur={changeBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {(error && (blur || popupStore.submit)) && <span className='text-xs text-rose-600 mt-2 mb-2'>{t( error )}</span>}
    </div>
}
