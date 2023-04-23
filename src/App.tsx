import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from './components/layouts/layout'
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
      }]
    }
  ])

  return <div className='flex flex-col h-screen start'>
     <RouterProvider router={router} />
  </div>
}

