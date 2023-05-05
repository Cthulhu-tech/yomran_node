import { CreateMessageDto, SendAnswer, SendIceCandidate, SendOffer } from './dto/create-message.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UpdateMessageDto } from './dto/update-message.dto'
import { ChatEntity } from 'src/chats/entities/chat.entity'
import { MessageEntity } from './entities/message.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Socket } from 'socket.io'

import { METHODTS } from '../../methods'
import { JoinRoom } from './type/type'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
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

  async send_offer (send_offer: SendOffer, client: Socket) {
    client.to(send_offer.user).emit(METHODTS.RECEIVE_OFFER, { offer: send_offer.offer, user: client.id })
  }

  async send_answer (send_answer: SendAnswer, client: Socket) {
    client.to(send_answer.user).emit(METHODTS.RECEIVE_ANSWER, { answer: send_answer.answer, user: client.id })
  }

  async send_ice_candidate (send_ice_candidate: SendIceCandidate, client: Socket) {
    if(send_ice_candidate.candidate)
    client.to(send_ice_candidate.user).emit(METHODTS.RECEIVE_ICE_CANDIDATE, { candidate: send_ice_candidate.candidate, user: client.id })
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

  async joinRoom(data: JoinRoom, client: Socket) {
    const roomId = Number(data?.room_id)

    if(!data?.room_id || isNaN(roomId))
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    const findRoom = await this.chatRepository.findOne({
      where: {
        id: roomId
      }
    })

    if(!findRoom || findRoom.delete)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    client.join(data.room_id)
    client.broadcast.to(data.room_id).emit(METHODTS.RECEIVE_CLIENT_JOINED, {
      user_server_id: client.id,
    })
  }
}
