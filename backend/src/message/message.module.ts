import { MessageEntity } from './entities/message.entity'
import { MessageService } from './message.service'
import { MessageGateway } from './message.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageGateway, MessageService]
})
export class MessageModule {}
