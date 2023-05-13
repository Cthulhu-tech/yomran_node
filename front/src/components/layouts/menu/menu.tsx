import { ElectronWindow } from "../../../interface/electron"
import { updateToken } from "../../../redux/token/token"
import { IStore, TokenType } from "../../../redux/type"
import { NavLink, useNavigate } from "react-router-dom"
import { logoutType, setting } from "./type"
import { useFetch } from "../../../hook/hook"
import { useSelector } from "react-redux"
import { Dropdown } from 'flowbite-react'
import { useDispatch } from "react-redux"

import { MouseEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

declare const window: ElectronWindow

export const Menu = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        
        createUserSetting(login)
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
            {token.access &&
            <div className="m-2">
                <Dropdown
                    label={token.user}
                    inline={true}
                >
                    <Dropdown.Item>
                        <NavLink to='/' >{ t('home') }</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <NavLink to='/setting' >{ t('setting') }</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <span onClick={logoutHandler} >{ t('logout') }</span>
                    </Dropdown.Item>
                </Dropdown>
            </div>}
            <div className="m-2">
                <Dropdown
                    label={setting.language.toLocaleUpperCase()}
                    inline={true}
                >
                    <Dropdown.Item>
                        <span onClick={changeLanguage}>English</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <span onClick={changeLanguage}>Русский</span>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    </section>
}
