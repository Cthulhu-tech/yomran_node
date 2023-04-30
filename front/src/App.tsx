import { createHashRouter, RouterProvider } from "react-router-dom"
import { Layout } from './components/layouts/layout'

import './style/global.scss'

import './plugin/i18n'

export const App = () => {

  const router = createHashRouter([
    {
      path: '/',
      element: <Layout/>,
    }
  ])

  return  <RouterProvider router={router} />
}

