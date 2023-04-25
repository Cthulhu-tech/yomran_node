import { ChangeEvent, useEffect, useState } from "react"

export const UpdateValueHook = <T,>(defaultValue: T) => {

    const [state, setState] = useState<T>(defaultValue)

    const callback = (event: ChangeEvent<HTMLInputElement>) => setState({...state, [event.target.name]: event.target.value})

    useEffect(() => {}, [state])

    return { state, callback, setState }
}