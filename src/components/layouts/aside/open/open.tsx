import { setButtonPopup, setOpenPopup } from '../../../../redux/store/open'
import { setDecodeSocketIO } from '../../../../redux/store/socket'
import { JWTdecode } from '../../../../../electron/src/chat/type'
import { IStore, PopupDefault } from '../../../../redux/type'
import { useDispatch, useSelector } from 'react-redux'
import { InputComponent } from '../../../input/input'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { Popup } from '../../popup/popup'
import jwt_decode from "jwt-decode"

import React, { useCallback, useState } from 'react'

const PopupMemo = React.memo(Popup)

export const Open = () => {

    const [token, setToken] = useState('')

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const open = useCallback(() => {
        dispatch(setOpenPopup(true))
        dispatch(setButtonPopup({
            first_btn: 'connect',
            last_btn: 'cancel',
        }))
    }, [])

    const popupStore = useSelector<IStore, PopupDefault<boolean>>((store) => store.PopupStore)

    const connect = useCallback( async () => {
        const decodedJWT: JWTdecode = jwt_decode(token)

        dispatch(setDecodeSocketIO(decodedJWT))

        navigate('socket')
    }, [token])

    const tokenUpdate = (event: React.ChangeEvent<HTMLInputElement>) => setToken(event.target.value)

    return  <>
    {(popupStore.open && popupStore.first_btn === 'connect') && 
    <PopupMemo callback={connect}>
        <div className='w-full'>
            <InputComponent placeholder='token' name="token" type="text" value={token} change={tokenUpdate}/>
        </div>
    </PopupMemo>}
    <button onClick={open} className="w-56 mb-4 mt-4 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 transition rounded-lg group bg-indigo-200 hover:bg-indigo-500">
        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md hover:text-slate-50">
            { t('open') }
        </span>
    </button>
    </>
}