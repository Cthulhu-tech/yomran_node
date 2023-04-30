import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { MessageService } from './message.service'

@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

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
