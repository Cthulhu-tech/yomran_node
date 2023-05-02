import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { MessageService } from './message.service'
import { JoinRoom } from './type/type'
import { Socket } from 'socket.io'

@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('joinRoom')
  joinRoomRoom(
    @MessageBody() data: JoinRoom,
    @ConnectedSocket() client: Socket
  ) {
    return this.messageService.joinRoom(data.room_id, client)
  }

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto)
  }

  @SubscribeMessage('findAllMessage')
  findAll(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.findAll(+updateMessageDto.chatId)
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto)
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.remove(+updateMessageDto.messageId)
  }
}
