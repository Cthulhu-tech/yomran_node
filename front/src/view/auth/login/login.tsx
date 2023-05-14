import { updateToken } from "../../../redux/token/token"
import { TokenType } from "../../../redux/type"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../../hook/hook"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { UserLogin } from "./type"
import { useEffect } from "react"

export const Login = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm<UserLogin>()

    const { fetchData, returnData, error }= useFetch<UserLogin, TokenType>('auth/login', 'POST')

    const handlerLogin = handleSubmit((data) => fetchData(data))

    useEffect(() => {
      if(!error.message && returnData?.access){
        dispatch(updateToken(returnData.access))
        navigate('/')
      }
    }, [returnData])

    return <section className="flex justify-center content-center w-full h-full">
    <form onSubmit={handlerLogin} className="flex flex-col justify-center max-w-lg content-center">
      <div>
        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">{t('email')}</span>
        <input
          type='email'
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register('email', { required: "Email is required." })}
        />
        {errors.email &&
        <p
          className="mt-2 mb-2 text-sm text-red-800 rounded-lg"
        >{ t(errors.email.message  as string) }</p>}
      </div>
      <div>
        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">{t('password')}</span>
        <input
          type="password"
          placeholder={ t('password') as string }
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register('password', {
            required: "Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
              message: "Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
            },
          })}
        />
        {errors.password &&
        <p
          className="mt-2 mb-2 text-sm text-red-800 rounded-lg"
        >{ t(errors.password.message as string) }</p>}
      </div>
      <div>
        {error.message &&
          <p
            className="mt-2 mb-2 text-sm text-red-800 rounded-lg"
          >{ t(error.message) }</p>}
      </div>
      <button className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded capitalize">
          { t('Submit') }
      </button>
    </form>
    </section>
}