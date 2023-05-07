import { Navigate, useLocation } from "react-router-dom"
import { TokenType } from "../../../redux/type"
import { IStore } from "../../../redux/type"
import {useSelector} from "react-redux"
import React from 'react'

export const ProtectedRoute = (props: {children: React.ReactNode}) => {

    const location = useLocation()
    const user = useSelector<IStore, TokenType>((state) => state.Token)
    
    if(!user.access && !location.pathname.includes('auth')) 
        return <Navigate to="/auth" state={{ from: location }} replace />

    return <>{props.children}</>
}
