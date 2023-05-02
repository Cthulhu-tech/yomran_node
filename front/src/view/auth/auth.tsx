import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

export const Auth = () => {

    const { t } = useTranslation()

    return  <section className="flex justify-center content-center items-center w-full h-full">
        <div className="w-96 flex justify-center content-center items-center">
            <div className="w-32">
                <NavLink 
                    to="/auth/login"
                    className="no-underline w-full text-center block"
                >
                    { t('Login') }
                </NavLink>
            </div>
            <div className="w-32">
                <NavLink 
                    className="no-underline w-full text-center block"
                    to="/auth/registration"
                >
                    { t('Registration') }
                </NavLink>
            </div>
        </div>
    </section>
}
