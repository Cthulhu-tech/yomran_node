import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayDisconnect } from '@nestjs/websockets'
import { CreateMessageDto, SendAnswer, SendIceCandidate, SendOffer } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { MessageService } from './message.service'
import { JoinRoom } from './type/type'
import { Socket } from 'socket.io'

import { METHODTS } from '../../methods'

@WebSocketGateway({
    cors: {
      origin: 'http://localhost:3000',
      methods: ["GET", "POST"],
      credentials: true,
      transports: ['websocket', 'polling'],
      optionsSuccessStatus: 200,
  },
  allowEIO3: true
})
export class MessageGateway  implements OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage(METHODTS.JOIN_ROOM)
  joinRoom(
    @MessageBody() data: JoinRoom,
    @ConnectedSocket() client: Socket
  ) {
    return this.messageService.joinRoom(data, client)
  }

  @SubscribeMessage(METHODTS.SEND_OFFER)
  send_offer(
    @MessageBody() SendOffer: SendOffer,
    @ConnectedSocket() client: Socket
  ) {
    return this.messageService.send_offer(SendOffer, client)
  }

  @SubscribeMessage(METHODTS.SEND_ANSWER)
  send_answer(
    @MessageBody() SendAnswer: SendAnswer,
    @ConnectedSocket() client: Socket
  ) {
    return this.messageService.send_answer(SendAnswer, client)
  }
  
  @SubscribeMessage(METHODTS.SEND_ICE_CANDIDATE)
  send_ice_candidate(
    @MessageBody() SendIceCandidate: SendIceCandidate,
    @ConnectedSocket() client: Socket
  ) {
    return this.messageService.send_ice_candidate(SendIceCandidate, client)
  }

  @SubscribeMessage(METHODTS.CREATE_MESSAGE)
  create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    return this.messageService.create(createMessageDto, client)
  }

  @SubscribeMessage(METHODTS.FIND_ALL_MESSAGE)
  findAll(
    @MessageBody() updateMessageDto: UpdateMessageDto,
    @ConnectedSocket() client: Socket
    ) {
    return this.messageService.findAll(+updateMessageDto.chatId, client)
  }

  @SubscribeMessage(METHODTS.UPDATE_MESSAGE)
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto)
  }

  @SubscribeMessage(METHODTS.REMOVE_MESSAGE)
  remove(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.remove(+updateMessageDto.messageId)
  }

  handleDisconnect(client: Socket){
    return this.messageService.disconnect(client)
  }
}
