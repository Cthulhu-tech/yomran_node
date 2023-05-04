import { UserEntity } from "src/users/entities/user.entity"

export class CreateMessageDto {
    message: string
    user: UserEntity
}

class UserDto {
    user: string
}

export class SendOffer extends UserDto {
    offer: string
}

export class SendAnswer extends UserDto {
    answer: string
}

export class SendIceCandidate extends UserDto {
    candidate: string
}
