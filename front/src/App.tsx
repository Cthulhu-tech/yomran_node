import { createBrowserRouter, createHashRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import { Registration } from "./view/auth/registration/registration"
import { Layout } from './components/layouts/layout'
import { Login } from "./view/auth/login/login"
import { Auth } from "./view/auth/auth"
import './style/global.scss'
import './plugin/i18n'

import { RefreshLoader } from "./components/layouts/loader"

export const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      loader: RefreshLoader,
      id: 'refresh',
      errorElement: <Navigate to='auth'/>,
      children: [
        {
          index: true,
          element: <Layout/>
        },
      ],
    },
    {
      path: 'auth',
      children: [
        {
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
            }
          ]
        },
      ]
    },
    {
      path: '*',
      element: <>Not found</>
    }
  ])

  return  <RouterProvider router={router} />
}

