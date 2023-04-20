import { Header } from './components/layouts/header/header'
import { ElectronWindow } from './interface/electron'

import './style/global.scss'

declare const window: ElectronWindow
  
export const App = () => {

  const create = async () => {
    const data = await window.api.create_chat({chat_name: 'chat', password: '123'})
    console.log(data)
  }

  return <>
      <Header/>
        <h1>Hello React</h1>
      <button onClick={create}>Click me</button>
  </>
}

