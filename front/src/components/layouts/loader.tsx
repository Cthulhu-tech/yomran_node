import { updateToken } from "../../redux/token/token"
import { TokenRefresh } from "../../redux/type"
import { store } from "../../redux/root"
import axios from "axios"

export const RefreshLoader = async () => {

    const data = await axios.post<TokenRefresh>(process.env.REACT_APP_SERVER + 'auth/refresh', null, { withCredentials: true })

    if(data.data) await store.dispatch(updateToken(data.data.access))

    return data.data
}
