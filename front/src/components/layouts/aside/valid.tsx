import { CreateChatType } from './type'

export const validationCreate = (state: CreateChatType) => {
    const error: CreateChatType = {} as CreateChatType
    if(state.name && state.name.trim().length < 3) error.name = 'Minimum length 3 character.'
    if(state.password && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(state.password.trim())) error.password = 'Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'
    return error
}
