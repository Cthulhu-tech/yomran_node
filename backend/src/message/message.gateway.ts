import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { MessageService } from './message.service'
import { JoinRoom } from './type/type'
import { Socket } from 'socket.io'

import { METHODTS } from '../../methods'

@WebSocketGateway({
    cors: {
      origin: true,
      methods: ["GET", "POST"],
      credentials: true,
      transports: ['websocket', 'polling'],
  },
  allowEIO3: true
})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage(METHODTS.JOIN_ROOM)
  joinRoomRoom(
    @MessageBody() data: JoinRoom,
    @ConnectedSocket() client: Socket
  ) {
    return this.messageService.joinRoom(data, client)
  }

  @SubscribeMessage(METHODTS.CREATE_MESSAGE)
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto)
  }

  @SubscribeMessage(METHODTS.FIND_ALL_MESSAGE)
  findAll(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.findAll(+updateMessageDto.chatId)
  }

  @SubscribeMessage(METHODTS.UPDATE_MESSAGE)
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto)
  }

  @SubscribeMessage(METHODTS.REMOVE_MESSAGE)
  remove(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.remove(+updateMessageDto.messageId)
  }
}
