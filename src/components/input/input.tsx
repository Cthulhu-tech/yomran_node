import { useTranslation } from "react-i18next"
import { InputTypeComponent } from "./type"

export const InputComponent = ({ type, name, value, change, placeholder }: InputTypeComponent) => {

    const { t } = useTranslation()

    return  <div className='pt-2 pb-2'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t(placeholder) }</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={change}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    </div>
}