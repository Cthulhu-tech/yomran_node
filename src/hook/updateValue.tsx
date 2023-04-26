import { ChangeEvent, useEffect, useState } from "react"

export const UpdateValueHook = <T,>(defaultValue: T, validation: (data: T) => T) => {

    const [state, setState] = useState<T>(defaultValue)
    const [error, setError] = useState<T>({} as T)

    const callback = (event: ChangeEvent<HTMLInputElement>) => setState({...state, [event.target.name]: event.target.value})

    useEffect(() => {
        setError(validation(state))
    }, [state])

    return { state, callback, error, setState, setError }
}