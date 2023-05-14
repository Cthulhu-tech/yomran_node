export class CreateMessageDto {
    message: string
    user: number
    room: number
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
