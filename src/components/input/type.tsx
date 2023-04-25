import { ChangeEvent } from "react"

export type InputTypeComponent = {
    type: string
    name: string
    value: string
    placeholder: string
    change: (event: ChangeEvent<HTMLInputElement>) => void
}