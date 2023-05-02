import { updateToken } from "../../redux/token/token"
import { TokenRefresh } from "../../redux/type"
import { useDispatch } from "react-redux"
import axios from "axios"

export const RefreshLoader = async () => {

    const dispath = useDispatch()

    const data = await axios.post<TokenRefresh>(process.env.REACT_APP_SERVER + 'auth/refresh', null, { withCredentials: true })

    if(data.data) await dispath(updateToken(data.data.access))

    return data.data
}