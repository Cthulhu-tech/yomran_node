import { CreateType, ChatsData } from "./type"
import { useTranslation } from "react-i18next"
import { useFetch } from "../../hook/hook"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

import { ElectronWindow } from "../../interface/electron"
import { redirect } from "react-router-dom"

declare const window: ElectronWindow

export const Create = () => {
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateType>()
    const { fetchData, returnData }= useFetch<CreateType, ChatsData>('chats/', 'POST', true)

    const handlerCreate = handleSubmit((data) => fetchData(data))
    const createRoomHandler = async () => {
        const data = await window.api.createRoom({ id: returnData.id, name: returnData.name })
        redirect('video/' + data)
    }

    useEffect(() => {
        if(returnData)
            createRoomHandler()
    }, [returnData])

    return <div className="max-w-screen-xl m-auto h-full flex flex-col justify-center items-center">
        <div className="w-full max-w-screen-xl m-auto px-4 py-16 sm:px-6 lg:px-8">
            <form onSubmit={handlerCreate} className="m-auto m-full mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <span className="block mb-2 text-sm w-full font-medium text-gray-900 dark:text-white capitalize">{t('room name')}</span>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder={ t('room name') as string }
                            {...register('name', { 
                                required: "Minimum length 3 character.",
                                min: 3,
                            })}
                        />
                    </div>
                    {errors.name &&
                    <p
                    className="mt-2 mb-2 text-sm text-red-800 rounded-lg"
                    >{ t(errors.name.message  as string) }</p>}
                </div>
                <div>
                    <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">{t('password')}</span>
                    <div className="relative">
                        <input
                            type="password"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder={ t('password') as string }
                            {...register('password', {
                                required: "Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                                    message: "Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
                                },
                            })}
                        />
                    </div>
                    {errors.password &&
                    <p
                    className="mt-2 mb-2 text-sm text-red-800 rounded-lg"
                    >{ t(errors.password.message  as string) }</p>}
                </div>
                <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white capitalize">
                    { t('create conference') }
                </button>
            </form>
        </div>
    </div>
}
