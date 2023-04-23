import { JWTdecode } from '../../../../../electron/src/chat/type'
import { ElectronWindow } from '../../../../interface/electron'
import { io } from 'socket.io-client'

const jwt_decode = require('jwt-decode')

declare const window: ElectronWindow

export const Create = () => {

    const create = async () => {
        const data = await window.api.create_chat({chat_name: 'chat', password: '123'})
        const decodedJWT: JWTdecode = jwt_decode(data)

        const socket = io(decodedJWT.ipV4 + ':' + decodedJWT.port)
    }

    return <div>
        <button onClick={create}>create new room</button>
    </div>
}