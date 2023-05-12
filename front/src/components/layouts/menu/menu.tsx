import { ElectronWindow } from "../../../interface/electron"
import { updateToken } from "../../../redux/token/token"
import { IStore, TokenType } from "../../../redux/type"
import { NavLink, useNavigate } from "react-router-dom"
import { useFetch } from "../../../hook/hook"
import { useSelector } from "react-redux"
import { Dropdown } from 'flowbite-react'
import { useDispatch } from "react-redux"
import { logoutType } from "./type"
import { useEffect } from "react"
import { t } from "i18next"

declare const window: ElectronWindow

export const Menu = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector<IStore, TokenType>((store) => store.Token)
    const { fetchData, returnData, error }= useFetch<undefined, logoutType>('auth/logout', 'POST')

    const logoutHandler = () => fetchData()

    useEffect(() => {
        if(returnData.message && !error.message) {
            dispatch(updateToken(''))
            navigate('/auth')
        }
    }, [returnData])

    const getUserSetting = async (login: string) => await window.api.getUserSetting({ login })

    useEffect(() => {
        if(token.access && token.user) {
            console.log(getUserSetting(token.user))
        }
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
                    label={token.user}
                    inline={true}
                >
                    <Dropdown.Item>
                        <span>English</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <span>Русский</span>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    </section>
}
