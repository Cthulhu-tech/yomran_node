import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { MessageEntity } from './entities/message.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ){}
  async create(createMessageDto: CreateMessageDto) {
    if(!createMessageDto.message)
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    const createMessage = await this.messageRepository.create({
      message: createMessageDto.message,
      message_creater: createMessageDto.user,
    })

    return await this.messageRepository.save(createMessage)
  }

  async findAll(chatId: number) {
    if(!chatId || isNaN(chatId))
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    return await this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.chats', 'chats')
      .leftJoin('message.message_creater', 'creater')
      .addSelect(['creater.id', 'creater.login', 'creater.delete'])
      .where('chats.id = :id', { 
        id: chatId,
      })
      .getMany()
  }

  async update(updateMessageDto: UpdateMessageDto) {
    if(!updateMessageDto.messageId || isNaN(updateMessageDto.messageId) || !updateMessageDto.message)
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    return await this.messageRepository.update({
      id: updateMessageDto.messageId
    },{
      message: updateMessageDto.message
    })
  }

  async remove(id: number) {
    if(!id || isNaN(id)) 
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    return await this.messageRepository.update({
      id
    },{
      delete: true
    })
  }
}
