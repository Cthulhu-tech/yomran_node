import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from './components/layouts/layout'
import { SocketChat } from "./view/socket/socket"
import { Chat } from "./view/chat/chat"

import './style/global.scss'

import './plugin/i18n'

export const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [{
        path: 'chat/:id',
        element:  <Chat/>
      },
      {
        path: 'socket',
        element:  <SocketChat/>
      }]
    }
  ])

  return  <RouterProvider router={router} />
}

