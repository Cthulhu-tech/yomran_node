import { Header } from './components/layouts/header/header'
import { ElectronWindow } from './interface/electron'

import './style/global.scss'

declare const window: ElectronWindow

export const App = () => {
  return <>
      <Header/>
        <h1>Hello React</h1>
      <button onClick={() => {
        window.api.notification({message: 'My custom Notification', chat: 'chat'});
      }}>Click me</button>
  </>
}

