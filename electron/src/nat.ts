// @ts-ignore  
import * as NatAPI from 'nat-api'

export class Nat {
    client: typeof NatAPI

    constructor() {
        this.client = new NatAPI()
    }

    public uPnp = (publicPort = 80, privatePort = 3000, ttl = 1800) => {
        return new Promise((resolve, reject) => {
            this.client.map({ publicPort, privatePort, ttl}, 
                (err: Error) => {
                    if (err) return reject(false)
                    return resolve(true)
                })
        })
    }

    public destroy = () => {
        this.client.destroy()
    }
}
