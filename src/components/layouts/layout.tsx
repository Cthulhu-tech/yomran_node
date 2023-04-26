import { Header } from "./header/header"
import { Aside } from "./aside/aside"
import { Menu } from "./menu/menu"

import { Outlet, useLocation } from 'react-router-dom'
import React from "react"

const HeaderMemo = React.memo(Header)
const AsideMemo = React.memo(Aside)
const MenuMemo = React.memo(Menu)

export const Layout = () => {

    const location = useLocation()

    return <div className={location.pathname !== '/socket' ? 'flex flex-col h-screen start' : 'flex flex-col h-screen start-socket'}>
        <HeaderMemo/>
        {location.pathname !== '/socket' && <AsideMemo/>}
        <MenuMemo/>
        <main className="main bg-slate-100 rounded-md overflow-hidden shadow-sm mt-2 mr-2 mb-2 ml-2">
            <Outlet />
        </main>
    </div>
}