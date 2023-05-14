import { RefreshLoader } from "../components/layouts/loader"
import { SocketProvider } from "../context/socketProvider"
import { createHashRouter } from "react-router-dom"
import { Suspense, lazy } from "react"

import { Layout } from '../components/layouts/layout'
import { Skeleton } from "../components/skeleton/skeleton"

const Video = lazy(() => import("../view/video/video"))
const Create = lazy(() => import("../view/create/create"))
const Connect = lazy(() => import("../view/connect/connect"))
const ErrorElement = lazy(() => import("../components/error/error"))
const ChatData = lazy(() => import("../components/chatData/chatData"))
const NotFound = lazy(() => import("../components/notFound/notFound"))

const Auth = lazy(() => import("../view/auth/auth"))
const Login = lazy(() => import("../view/auth/login/login"))
const Registration = lazy(() => import("../view/auth/registration/registration"))

export const router = createHashRouter([
{
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorElement/>,
    loader: () => RefreshLoader(),
    children: [
        {
            index: true,
            element: <Suspense fallback={<Skeleton/>}>
                    <ChatData/>
                </Suspense>
        },
        {
            path: '/create',
            element: <Suspense fallback={<Skeleton/>}>
                    <Create/>
                </Suspense>
        },
        {
            path: '/connection',
            element: <Suspense fallback={<Skeleton/>}>
                    <Connect/>
                </Suspense>
        },
        {
            path: '/video/:id',
            element: <SocketProvider>
                <Suspense fallback={<Skeleton/>}>
                    <Video/>
                </Suspense>
            </SocketProvider>
        },
        {
            path: '*',
            element: <Suspense fallback={<Skeleton/>}>
                <NotFound/>
            </Suspense>
        }
    ]
},
{
    path: 'auth',
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Suspense fallback={<Skeleton/>}>
                <Auth/>
            </Suspense>
        },
        {
            path: 'login',
            element: <Suspense fallback={<Skeleton/>}>
                <Login/>
            </Suspense>
        },
        {
            path: 'registration',
            element: <Suspense fallback={<Skeleton/>}>
                <Registration/>
            </Suspense>
        },
    ]
},
])