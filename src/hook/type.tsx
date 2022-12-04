export type IUseFetch<T, U> = [
    (url: string, data?: U) => void,
    boolean,
    T | undefined,
    ErrorData | undefined,
]

export type ErrorData = {
    message: string;
}