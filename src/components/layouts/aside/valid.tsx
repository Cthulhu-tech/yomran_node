import { CreateChatType } from './type'

export const validationCreate = (state: CreateChatType) => {
    const error: CreateChatType = {} as CreateChatType
    if(state.name && state.name.length < 3) error.name = 'Minimum length 3 character.'
    if(state.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(state.password)) error.password = 'Minimum eight characters, minimum one uppercase letter, one lowercase letter and one number.'
    return error
}
