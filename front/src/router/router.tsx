import { Registration } from "../view/auth/registration/registration"
import { Layout } from '../components/layouts/layout'
import { Login } from "../view/auth/login/login"
import { Auth } from "../view/auth/auth"

import { RefreshLoader } from "../components/layouts/loader"
import { ChatData } from "../components/chatData/chatData"
import { SocketProvider } from "../context/socketProvider"
import { NotFound } from "../components/notFound/notFound"
import { ErrorElement } from "../components/error/error"
import { createHashRouter } from "react-router-dom"
import { Create } from "../view/create/create"
import { Video } from "../view/video/video"

export const router = createHashRouter([
{
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorElement/>,
    loader: () => RefreshLoader(),
    children: [
        {
            index: true,
            element: <ChatData/>
        },
        {
            path: '/create',
            element: <Create/>
        },
        {
            path: '/video/:link',
            element: <SocketProvider>
                <Video/>
            </SocketProvider>
        },
        {
            path: '*',
            element: <NotFound/>
        }
    ]
},
{
    path: 'auth',
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Auth/>
        },
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: 'registration',
            element: <Registration/>
        },
    ]
},
])