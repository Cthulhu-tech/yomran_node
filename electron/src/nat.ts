// @ts-ignore  
const NatAPI = require('nat-api')

export class Nat {
    client: typeof NatAPI

    constructor() {
        this.client = new NatAPI()
    }

    public uPnp = (publicPort = 80, privatePort = 3000, ttl = 1800) => {
        this.client.map({ publicPort, privatePort, ttl}, 
        (err: Error) => {
            if (err) return console.log('Error', err)
            console.log('Port mapped!')
        })
    }

    public destroy = () => {
        this.client.destroy()
    }
}
