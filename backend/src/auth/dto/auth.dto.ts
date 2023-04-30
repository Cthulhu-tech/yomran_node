export class CreateAuthDto {
    email: string
    password: string
}

export interface JwtPayload {
    userId: string
}
