import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { Popup } from '../../popup/popup'

import { ElectronWindow } from '../../../../interface/electron'
import React, { useCallback, useState } from 'react'

const PopupMemo = React.memo(Popup)

declare const window: ElectronWindow

export const Open = () => {

    const [token, setToken] = useState('')

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const open = useCallback(() => {

    }, [])


    const connect = useCallback( async () => {

    }, [token])

    const tokenUpdate = (event: React.ChangeEvent<HTMLInputElement>) => setToken(event.target.value)

    return  <>
    <button onClick={open} className="w-56 mb-4 mt-4 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 transition rounded-lg group bg-indigo-200 hover:bg-indigo-500">
        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md hover:text-slate-50">
            { t('open') }
        </span>
    </button>
    </>
}