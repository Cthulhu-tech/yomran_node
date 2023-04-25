
export interface IAction<T, P> {
    readonly type: T
    readonly payload: P
}

export interface IStore {
    PopupStore: PopupDefault
}

export interface PopupDefault<T = any> extends PopupButtonType {
    open: boolean
    callback: (() => Promise<T>) | null,
}

export type PopupButtonType = {
    first_btn: string
    last_btn: string 
}
