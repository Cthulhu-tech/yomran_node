import { Header } from "./header/header"
import { Aside } from "./aside/aside"

import { Outlet } from 'react-router-dom';
import React from "react";

const AsideMemo = React.memo(Aside)
const HeaderMemo = React.memo(Header)

export const Layout = () => {

    return <>
        <HeaderMemo/>
        <AsideMemo/>
        <Outlet />
    </>
}