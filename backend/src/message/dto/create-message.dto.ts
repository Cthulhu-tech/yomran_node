import { UserEntity } from "src/users/entities/user.entity"

export class CreateMessageDto {
    message: string
    user: UserEntity
}
