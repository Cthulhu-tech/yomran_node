
import * as portfinder from 'portfinder'
import { Nat } from "../nat"

const publicIp = require('public-ip')
var jwt = require('jsonwebtoken')

export class Chat {
    chat_name: string
    password: string
    nat: Nat
    constructor(chat_name: string, password: string) {
        this.chat_name = chat_name
        this.password = password
        this.nat = new Nat()
    }
    private GetPortFree = async () => {
        return portfinder.getPortPromise({
            port: 3000,
            stopPort: 65535
        })
    }
    getInfoConnect = async () => {
        const new_port = await this.GetPortFree()

        return await this.nat.uPnp(new_port, new_port)
        .then(async () => {
            const ipV4 = await publicIp.v4()
            return await jwt.sign({ 
                ipV4, 
                password: this.password 
            }, this.password) as string
        })
        .catch(() => {
            return 'error'
        })
    }
}