import { DataSource } from 'typeorm';

import { Chat } from './entity/chat';
import { Message } from './entity/message';
import { User } from './entity/user';


export class Sql {
  private static instance: Sql = new Sql()
  private AppDataSource: DataSource
  constructor() {
    if (Sql.instance) return Sql.instance
    this.AppDataSource = new DataSource({
      type: "sqlite",
      database: './mydb.sqlite',
      entities: [User, Message, Chat],
      synchronize: true,
      logging: true,
    })
    Sql.instance = this
  }
  getUserEntity = () => {
    return User
  }
  getMessageEntity = () => {
    return Message
  }
  getChatEntity = () => {
    return Chat
  }
  initSqlLite = async () => {
    return await this.AppDataSource.initialize()
  }
  getAppDataSource = () => {
    return this.AppDataSource
  }
}
