import { checkToken } from '../utils/token/checkToken'
import { IStore, TokenType } from '../redux/type'
import { redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'

export const useFetch = <T = any,R = any>(url: string, method = 'GET', auth = false) => {

    const [error, setError] = useState({message: ''})
    const [loading, setLoading] = useState(true)
    const [returnData, setReturnData] = useState<R>({} as R)

    const token = useSelector<IStore, TokenType>((store) => store.Token)

    let headers = {}

    const fetchData = async (data?:T) => {
        setError({message: ''})
        if(auth) await checkToken(token.access || '') ?
        (headers = { 
            'Authorization': 'Bearer ' + token.access
        }) :
        redirect("/login")
        axios.defaults.withCredentials = true
        await axios<R>({
            method,
            url: process.env.REACT_APP_SERVER + url,
            data,
            headers, 
        })
        .then((response) => {
            if(response.status >= 400) return Promise.reject(response.data)
            return setReturnData(response.data)
        })
        .catch((error) => {
            return setError({message: error.response.data.message})
        })
        .finally(() => setLoading(false))
    }

    return { fetchData, returnData, loading, error }
}
