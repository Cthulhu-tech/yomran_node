export interface IAction<T, P> {
    readonly type: T
    readonly payload: P
}

export interface IStore {
    Token: TokenType
}

export interface TokenRefresh {
    access: string
}

export interface TokenType extends TokenRefresh {
    loading: boolean
    user: string
}
