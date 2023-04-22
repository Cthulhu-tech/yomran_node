import './style/global.scss';

import jwt_decode from 'jwt-decode';
import { io } from 'socket.io-client';

import { JWTdecode } from '../electron/src/chat/type';
import { Header } from './components/layouts/header/header';
import { ElectronWindow } from './interface/electron';

declare const window: ElectronWindow
  
export const App = () => {

  const create = async () => {
    const data = await window.api.create_chat({chat_name: 'chat', password: '123'})
    const decodedJWT: JWTdecode = jwt_decode(data)

    const socket = io(decodedJWT.ipV4 + ':' + decodedJWT.port)
  }

  return <>
      <Header/>
        <h1>Hello React</h1>
      <button onClick={create}>Click me</button>
  </>
}

