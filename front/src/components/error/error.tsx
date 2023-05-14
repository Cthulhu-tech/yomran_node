import { Navigate, useLocation, useRouteError } from "react-router-dom"
import { AxiosError } from "axios"

const ErrorElement = () => {

    const location = useLocation()
    const error = useRouteError() as AxiosError

    if(error.message === 'Request failed with status code 401' && location.pathname !== '/auth')
        return <Navigate to="auth" />

    return <>{error.message}</>
}

export default ErrorElement
