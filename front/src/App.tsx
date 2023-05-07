import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import './style/global.scss'
import './plugin/i18n'

export const App = () => {

  return  <RouterProvider router={router} />
}

