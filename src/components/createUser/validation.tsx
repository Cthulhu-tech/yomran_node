import { UserCreateType } from "../../../electron/src/chat/type"

export const validationCreateUser = (data: UserCreateType) => {
    const error: UserCreateType = {} as UserCreateType
    if(data.login.trim().length < 3) error.login = 'Minimum length 3 character.'
    return error
}
