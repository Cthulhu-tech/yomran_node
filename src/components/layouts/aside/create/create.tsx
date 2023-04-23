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

    return  <button onClick={create} className="ml-2 mr-2 w-48 mb-4 mt-4 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span className="w-48 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Create
        </span>
    </button>
}