import { ProtectedRoute } from "../components/auth/protected/protected"
import { Registration } from "../view/auth/registration/registration"
import { CheckRefresh } from "../view/auth/refresh/refresh"
import { Layout } from '../components/layouts/layout'
import { Login } from "../view/auth/login/login"
import { Auth } from "../view/auth/auth"

import { RefreshLoader } from "../components/layouts/loader"
import { SocketProvider } from "../context/socketProvider"
import { Navigate, createHashRouter } from "react-router-dom"
import { Video } from "../view/video/video"

export const router = createHashRouter([
{
    path: '/',
    element: <Layout/>,
    errorElement: <Navigate to="auth" />,
    loader: () => RefreshLoader(),
    children: [
        {
            path: '/video/:link',
            element: <SocketProvider>
                <Video/>
            </SocketProvider>
        },
        {
            path: '*',
            element: <>Not found</>
        }
    ]
},
{
    path: 'auth',
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
])