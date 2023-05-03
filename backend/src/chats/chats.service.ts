import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { ChatEntity } from './entities/chat.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ){}

  async create(createChatDto: CreateChatDto) {
    if(!createChatDto.name) 
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    const createChat = await this.chatRepository.create({
      name: createChatDto.name,
      chat_creater: createChatDto.user,
      password: createChatDto.password,
    })

    const saveChat = await this.chatRepository.save(createChat)

    return {
      name: saveChat.name,
      chat_creater: {
        login: saveChat.chat_creater.login,
        email: saveChat.chat_creater.email,
        id: saveChat.chat_creater.id,
        confirmed: saveChat.chat_creater.confirmed,
        create_time: saveChat.chat_creater.create_time,
      },
      delete: saveChat.delete,
      id: saveChat.id,
      create_time: saveChat.create_time
    }
  }

  async findAll(updateChatDto: UpdateChatDto) {
    return await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoin('chat.users', 'users')
      .leftJoin('chat.chat_creater', 'chat_creater')
      .where('chat_creater.id = :id', { 
        id: updateChatDto.user.id,
      })
      .andWhere('chat.delete = :delete', {
        delete: false
      })
      .getMany()
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    if(!updateChatDto.name || isNaN(id)) 
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)
    
    const findChat = await this.chatRepository.findOne({
      relations: {
        chat_creater: true
      },
      where: {
        id
      }
    })

    if(!findChat) 
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST)

    if(findChat.chat_creater.id !== updateChatDto.user.id)
      throw new HttpException('Not enough rights', HttpStatus.FORBIDDEN)

    await this.chatRepository.update({ id }, {
      name: updateChatDto.name,
    })

    return {
      message: 'Chat update!'
    }
  }

  async remove(id: number, updateChatDto: UpdateChatDto) {
    if(!id || isNaN(id)) 
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    const findChat = await this.chatRepository.findOne({
      relations: {
        chat_creater: true
      },
      where: {
        id
      }
    })

    if(!findChat) 
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST)

    if(findChat.chat_creater.id !== updateChatDto.user.id)
      throw new HttpException('Not enough rights', HttpStatus.FORBIDDEN)

    const _delete = await this.chatRepository.update({ id }, {
      delete: true
    })

    return {
      message: _delete.affected ? 'Chat delete' : 'Chat not delete'
    }
  }
}
