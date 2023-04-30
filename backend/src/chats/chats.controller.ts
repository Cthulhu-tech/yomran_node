import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { ChatsService } from './chats.service'

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto)
  }

  @Get()
  findAll(@Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.findAll(updateChatDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(+id, updateChatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.remove(+id, updateChatDto)
  }
}