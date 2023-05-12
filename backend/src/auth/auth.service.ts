import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserEntity } from 'src/users/entities/user.entity'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateAuthDto } from './dto/auth.dto'
import { Repository } from 'typeorm'
import { compare } from 'bcrypt'

import { Response, Request } from 'express'

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private async createAccessToken(id: number, login: string) {
    return sign({
      userId: id,
      login,
    }, 'access', {
      expiresIn: '15m',
    })
  }

  private async createRefreshToken(id: number, login: string) {
    return sign({ 
      userId: id,
      login,
    }, 'refresh', {
      expiresIn: '7d',
    })
  }

  private async setRefreshToken(res: Response, token) {
    res.cookie('refreshtoken', token, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 432000000),
    })
  }

  async refresh(res: Response, req: Request) {
    try {
      const _refreshToken = req?.cookies['refreshtoken']

      const { userId } = verify(_refreshToken, 'refresh') as JwtPayload

      const findUser = await this.userRepository.findOne({
          where: {
            id: userId,
          }
        })

      if (findUser.token !== _refreshToken)
        throw new HttpException('Token not Valid', HttpStatus.UNAUTHORIZED)

      const access = await this.createAccessToken(findUser.id, findUser.login)
      const refresh = await this.createRefreshToken(findUser.id, findUser.login)

      await this.setRefreshToken(res, refresh)

      findUser.token = refresh

      await this.userRepository.save(findUser)

      return {
        access,
      }
    } catch (err) {
      throw new HttpException('Token not Valid', HttpStatus.UNAUTHORIZED);
    }
  }
  async login(userLogin: CreateAuthDto, res: Response) {
    if (!userLogin.email || !userLogin.password)
      throw new HttpException('Fill in all the fields', HttpStatus.BAD_REQUEST)

    const findUser = await this.userRepository.findOne({
      where: {
        email: userLogin.email,
      }
    })

    if(!findUser || !await compare(userLogin.password, findUser.password))
      throw new HttpException('Password or email is incorrect', HttpStatus.BAD_REQUEST)

      const access = await this.createAccessToken(findUser.id, findUser.login)
      const refresh = await this.createRefreshToken(findUser.id, findUser.login)

    await this.setRefreshToken(res, refresh)

    findUser.token = refresh

    await this.userRepository.save(findUser)
    return {
      access,
    }
  }
}
