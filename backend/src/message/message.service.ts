import { CreateMessageDto, SendAnswer, SendIceCandidate, SendOffer } from './dto/create-message.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UpdateMessageDto } from './dto/update-message.dto'
import { ChatEntity } from 'src/chats/entities/chat.entity'
import { UserEntity } from 'src/users/entities/user.entity'
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
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){}

  private async searchRoom (data: JoinRoom, client: Socket) {
    const roomId = Number(data?.room_id)
    if(!data?.room_id || isNaN(roomId))
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)
    const findRoom = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.users', 'users')
      .where('chat.id = :id', { 
        id: data.room_id
      })
      .getOne()
    if(!findRoom || findRoom.delete || !findRoom.work) {
      client.leave(roomId.toString())
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST)
    }
    return findRoom
  }

  async create(createMessageDto: CreateMessageDto, client: Socket) {
    if(!createMessageDto.message)
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    const user = await this.userRepository.findOneBy({
      id: createMessageDto.user,
    })

    const chat = await this.chatRepository.findBy({
      id: createMessageDto.room,
    })

    const createMessage = await this.messageRepository.create({
      message: createMessageDto.message,
      message_creater: user,
      chats: chat
    })

    const saveMessage = await this.messageRepository.save(createMessage)

    const returnData = {
      id: saveMessage.id,
      create_time: saveMessage.create_time,
      message_creater: {
        id: saveMessage.message_creater.id,
        login: saveMessage.message_creater.login,
      },
      message: saveMessage.message,
    }

    client.broadcast.to(createMessageDto.room.toString()).emit(METHODTS.CREATE_MESSAGE, returnData)
    client.emit(METHODTS.CREATE_MESSAGE, returnData)
  }

  async disconnect (client: Socket) {
    client.broadcast.emit(METHODTS.RECEIVE_DISONECT, { user: client.id })
    client.disconnect()
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

  async findAll(chatId: number, client: Socket) {
    if(!chatId || isNaN(chatId))
      throw new HttpException('All fields must be filled', HttpStatus.BAD_REQUEST)

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.chats', 'chats')
      .leftJoin('message.message_creater', 'creater')
      .addSelect(['creater.id', 'creater.login', 'creater.delete'])
      .where('chats.id = :id', { 
        id: chatId,
      })
      .getMany()

    client.emit(METHODTS.FIND_ALL_MESSAGE, { messages })
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
    const findRoom = await this.searchRoom(data, client)
    const user = await this.userRepository.findOneBy({
      id: data.user_id
    })

    await this.chatRepository.save({
      ...findRoom,
      users: [...findRoom.users || [], user]
    })

    client.join(data.room_id)
    client.broadcast.to(data.room_id).emit(METHODTS.RECEIVE_CLIENT_JOINED, {
      user_server_id: client.id,
    })
  }
}
