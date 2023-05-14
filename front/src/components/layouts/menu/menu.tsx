import { ElectronWindow } from "../../../interface/electron"
import { updateToken } from "../../../redux/token/token"
import { IStore, TokenType } from "../../../redux/type"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useFetch } from "../../../hook/hook"
import { logoutType, setting } from "./type"
import { useSelector } from "react-redux"
import { Dropdown } from 'flowbite-react'
import { useDispatch } from "react-redux"

import { MouseEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

declare const window: ElectronWindow

export const Menu = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [setting, setSetting] = useState<setting>({
        user: null,
        language: 'english'
    })
    const { t, i18n } = useTranslation()
    const token = useSelector<IStore, TokenType>((store) => store.Token)
    const { fetchData, returnData, error }= useFetch<undefined, logoutType>('auth/logout', 'POST')

    const logoutHandler = () => fetchData()

    useEffect(() => {
        if(returnData.message && !error.message) {
            dispatch(updateToken(''))
            navigate('/auth')
        }
    }, [returnData])

    const getUserSetting = async (login: string) => {
        const newSetting = await window.api.getUserSetting({ login })
        setSetting({
            user: newSetting,
            language: newSetting?.settings[0]?.lang ? newSetting?.settings[0]?.lang : setting.language
        })
        
        if(!newSetting) createUserSetting(login)
        else i18n.changeLanguage(newSetting?.settings[0]?.lang || setting.language)
    }
    const createUserSetting = async (login: string) =>{
        const newSetting = await window.api.createUserSetting({ login })
        setSetting({
            user: newSetting,
            language: newSetting?.settings[0]?.lang ? newSetting?.settings[0]?.lang : setting.language
        })
    }
    const changeLanguage = async (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        let language = event.currentTarget.innerText.toLocaleLowerCase()
        if(token.user && setting?.user?.settings[0]?.id){
            const newSetting = await window.api.changeLanguage({ id: setting.user.settings[0].id, language, login: token.user })
            setSetting({
                user: newSetting,
                language
            })
        }else {
            setSetting({
                user: null,
                language
            })
        }
        i18n.changeLanguage(language)
    }

    useEffect(() => {
        if(token.access && token.user)
            getUserSetting(token.user)
    }, [token])

    return <section className="menu shadow-sm mt-2 mr-2 mb-2 ml-2 p-2 rounded-md bg-indigo-100">
        <div className="flex h-full justify-between items-center">
            {token.access && !location.pathname.includes('video') &&
            <div className="m-2 capitalize">
                <Dropdown
                    label={token.user}
                    inline={true}
                >
                    <NavLink to='/' >
                        <Dropdown.Item>
                            { t('home') }
                        </Dropdown.Item>
                    </NavLink>
                    <NavLink to='/setting'>
                        <Dropdown.Item>
                            { t('setting') }
                        </Dropdown.Item>
                    </NavLink>
                    <NavLink to='/create' >
                        <Dropdown.Item>
                            { t('create conference') }
                        </Dropdown.Item>
                    </NavLink>
                    <span onClick={logoutHandler}>
                        <Dropdown.Item>
                            { t('logout') }
                        </Dropdown.Item>
                    </span>
                </Dropdown>
            </div>}
            <div className="m-2 capitalize">
                <Dropdown
                    label={setting.language.toLocaleUpperCase()}
                    inline={true}
                >
                    <span onClick={changeLanguage}>
                        <Dropdown.Item>
                            English
                        </Dropdown.Item>
                    </span>
                    <span onClick={changeLanguage}>
                        <Dropdown.Item>
                            Русский
                        </Dropdown.Item>
                    </span>
                </Dropdown>
            </div>
        </div>
    </section>
}
