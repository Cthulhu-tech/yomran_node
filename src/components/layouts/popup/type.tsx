export type PopupType<T> = {
    callback: () => Promise<T>
    children: JSX.Element
}
