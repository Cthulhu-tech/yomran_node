import { createHashRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import { ProtectedRoute } from "./components/auth/protected/protected"
import { Registration } from "./view/auth/registration/registration"
import { CheckRefresh } from "./view/auth/refresh/refresh"
import { Layout } from './components/layouts/layout'
import { Login } from "./view/auth/login/login"
import { Auth } from "./view/auth/auth"
import './style/global.scss'
import './plugin/i18n'

export const App = () => {

  const router = createHashRouter([
    {
      path: '/',
      element: <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>,
      loader: CheckRefresh,
      errorElement: <Navigate to='/auth' replace />,
      children: [
        {
          index: true,
          element: <Outlet/>
        },
        {
          path: 'protected',
          element: <>protected</>
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

  return  <RouterProvider router={router} />
}

