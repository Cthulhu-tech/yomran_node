import { NavLink, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const NotFound = () => {

    const location = useLocation()
    const { t } = useTranslation()

    return <div className="flex flex-col justify-center items-center h-full bg-slate-100">
        <div className="max-w-5xl p-5 m-auto">
            <p className="text-sm italic">{ t('Not Found URL: ') + location.pathname }</p>
            <div className="flex">
                <p className="pr-2">{ t('return to') }</p>
                <NavLink to='/' className='underline italic'>{ t('Home') }</NavLink>
                <p className="pl-2">{ t('page') }</p>
            </div>
        </div>
    </div>
}
