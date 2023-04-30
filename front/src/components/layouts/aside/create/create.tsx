import { ElectronWindow } from '../../../../interface/electron'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { useDispatch } from 'react-redux'
import { Popup } from '../../popup/popup'

import React from 'react'

declare const window: ElectronWindow

export const Create = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    return  <>
    <button className="w-56 mb-4 mt-4 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 transition rounded-lg group bg-indigo-200 hover:bg-indigo-500">
        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md hover:text-slate-50">
            { t('create') }
        </span>
    </button>
    </>
}
