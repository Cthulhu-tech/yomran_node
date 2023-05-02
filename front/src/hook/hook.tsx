import { IStore, TokenType } from '../redux/type'
import { checkToken } from '../utils/checkToken'
import { redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'

export const useFetch = <T = any,R = any>(url: string, method = 'GET', auth = false) => {

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [returnData, setReturnData] = useState<R>({} as R)

    const token = useSelector<IStore, TokenType>((store) => store.Token)

    let headers = {}

    const fetchData = async (data?:T) => {

        if(auth) await checkToken(token.access || '') ?
        (headers = { 
            'Authorization': 'Bearer ' + token.access
        }) :
        redirect("/login")

        await axios<R>({
            method,
            url: process.env.REACT_APP_SERVER + url,
            data,
            headers, 
            withCredentials: true
        })
        .then((response) => {
            if(response.status > 400) return Promise.reject(response.data)
            return setReturnData(response.data)
        })
        .catch(() => {
            return setError(true)
        })
        .finally(() => setLoading(false))
    }

    return { fetchData, returnData, loading, error }
}
