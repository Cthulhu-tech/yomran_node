import { ProtectedRoute } from "../components/auth/protected/protected"
import { Registration } from "../view/auth/registration/registration"
import { CheckRefresh } from "../view/auth/refresh/refresh"
import { Layout } from '../components/layouts/layout'
import { Login } from "../view/auth/login/login"
import { Auth } from "../view/auth/auth"

import { createHashRouter, Navigate, Outlet } from "react-router-dom"
import { SocketProvider } from "../context/socketProvider"
import { Video } from "../view/video/video"

export const router = createHashRouter([
{
    path: '/',
    element: <ProtectedRoute>
            <Layout/>
        </ProtectedRoute>,
    loader: CheckRefresh,
    errorElement: <Navigate to={'/auth'}/>,
    children: [
        {
            index: true,
            element: <Outlet/>
        },
        {
            path: 'video',
            element: <SocketProvider>
                <Video/>
            </SocketProvider>
        }
    ],
},
{
    path: '/auth',
    element: <Layout/>,
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
{
    path: '*',
    element: <>Not found</>
}
])