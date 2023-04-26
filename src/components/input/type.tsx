import { ChangeEvent } from "react"

export type InputTypeComponent = {
    type: string
    name: string
    value: string
    placeholder: string
    error?: string | null
    change: (event: ChangeEvent<HTMLInputElement>) => void
}