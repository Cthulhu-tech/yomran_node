import { DataSource } from 'typeorm';

import { Chat } from './entity/chat';
import { Message } from './entity/message';
import { User } from './entity/user';


export class Sql {
  private static instance: Sql
  private AppDataSource: DataSource
  constructor() {
    if (Sql.instance) return Sql.instance
    this.AppDataSource = new DataSource({
      type: "sqlite",
      database: __dirname + './mydb.sqlite',
      entities: [User, Message, Chat],
      logging: true
    })
    Sql.instance = this
  }
  initSqlLite = async () => {
    return await this.AppDataSource.initialize()
  }
  getAppDataSource = () => {
    return this.AppDataSource
  }
}
