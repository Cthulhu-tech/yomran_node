import { Header } from "./header/header"
import { Menu } from "./menu/menu"

import { Outlet } from 'react-router-dom'
import React from "react"

const HeaderMemo = React.memo(Header)
const MenuMemo = React.memo(Menu)

export const Layout = () => {

    return <div className='flex flex-col h-screen start'>
        <HeaderMemo/>
        <MenuMemo/>
        <main className="main bg-slate-100 rounded-md overflow-hidden shadow-sm mt-2 mr-2 mb-2 ml-2">
            <Outlet />
        </main>
    </div>
}
