import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){}

  private findUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  async create(createUserDto: CreateUserDto) {
    if(!createUserDto.email || !createUserDto.login || !createUserDto.password)
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    if(!(/\S+@\S+\.\S+/).test(createUserDto.email))
      throw new HttpException('Email not valid', HttpStatus.BAD_REQUEST)

    if(await this.findUserByEmail(createUserDto.email)) 
      throw new HttpException('This email address is used', HttpStatus.BAD_REQUEST)

    const createUser = await this.userRepository.create({
      login: createUserDto.login,
      email: createUserDto.email,
      password: await hash(createUserDto.password, 10),
    })

    const userSave = await this.userRepository.save(createUser)

    return {
      login: userSave.login,
      email: userSave.email,
      id: userSave.id,
      confirmed: userSave.confirmed,
      create_time: userSave.create_time,
    }
  }

  async findOne(id: number) {
    if(!id || isNaN(id))
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    const findUser = await this.userRepository.findOne({
      where: {
        id,
      }
    })

    if(!findUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)

    return {
      login: findUser.login,
      email: findUser.email,
      id: findUser.id,
      confirmed: findUser.confirmed,
      create_time: findUser.create_time,
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if(!id || isNaN(id) || (!updateUserDto.email && !updateUserDto.login && !updateUserDto.password))
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)
    if(id !== updateUserDto.user.id)
      throw new HttpException('Not enough rights', HttpStatus.FORBIDDEN)
    
    const updateParams: CreateUserDto = {} as CreateUserDto

    if(updateUserDto.login) updateParams.login = updateUserDto.login
    if(updateUserDto.email) updateParams.email = updateUserDto.email
    if(updateUserDto.password) updateParams.password = updateUserDto.password

    await this.userRepository.update({ id }, {
      ...updateParams
    })

    return {
      message: 'User update!'
    }
  }

  async remove(id: number, updateUserDto: UpdateUserDto) {
    if(id !== updateUserDto.user.id)
      throw new HttpException('Not enough rights', HttpStatus.FORBIDDEN)

    return await this.userRepository.update({ id }, {
      delete: true,
    })
  }
}
