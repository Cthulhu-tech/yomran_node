import { ChatEntity } from 'src/chats/entities/chat.entity'
import { MessageEntity } from './entities/message.entity'
import { MessageService } from './message.service'
import { MessageGateway } from './message.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    TypeOrmModule.forFeature([ChatEntity])
  ],
  providers: [MessageGateway, MessageService]
})
export class MessageModule {}
