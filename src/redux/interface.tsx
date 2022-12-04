export interface Action<T, P> {
    readonly type: T
    readonly payload?: P
}

export type StoreData = {
    visibleAside: booleanType
    roomsStore: RoomsType[]
    visiblePopup: PopupType
    visibleCreate: CreateType
}

export type PopupType = {
    open: boolean
    callback: () => void
    message: string
    leftButton: string
    rightButton: string
}

export type CreateType = {
    open: boolean
    callback: () => void
}

export type booleanType = {
    open: boolean
}

export type RoomsType = {
    id: number
    name: string
    creator: string
    img: string
    lastMessage: string
    lastMessageDate: string
    lastMessageUserImg: string
}