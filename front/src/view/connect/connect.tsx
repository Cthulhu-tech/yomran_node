import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import jwt_decode from "jwt-decode"
import { DecodeLink } from "./type"
import { useNavigate } from "react-router-dom"

const Connect = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setError } = useForm<{
        link: string
    }>()

    const handlerConnection = handleSubmit(async (data) => {
            try {
                const decoded = jwt_decode<DecodeLink>(data.link)
                if(decoded.id)
                    navigate('/video/' + decoded.id, {
                        state: {
                            link: data.link
                        }
                    })
            } catch {
                setError('link', {
                    message: 'Token not valid'
                })
            }
        })

    return <div className="bg-slate-100 max-w-screen-xl m-auto h-full flex flex-col justify-center items-center">
        <div className="w-full max-w-screen-xl m-auto px-4 py-16 sm:px-6 lg:px-8">
            <form onSubmit={handlerConnection} className="m-auto m-full mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <span className="block mb-2 text-sm w-full font-medium text-gray-900 dark:text-white capitalize">{t('connection link')}</span>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder={ t('connection link') as string }
                            {...register('link', { 
                                required: "Link is required",
                            })}
                        />
                    </div>
                    {errors.link &&
                    <p
                    className="mt-2 mb-2 text-sm text-red-800 rounded-lg"
                    >{ t(errors.link.message  as string) }</p>}
                </div>
                <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white capitalize">
                    { t('connection') }
                </button>
            </form>
        </div>
    </div>
}

export default Connect
