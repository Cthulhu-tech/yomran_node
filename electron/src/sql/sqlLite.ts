import { UserCreateType } from '../chat/type'

import { Message } from './entity/message'
import { Chat } from './entity/chat'
import { User } from './entity/user'

import { DataSource } from 'typeorm'

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
  createUser = ({ login }: UserCreateType) => {
    const userEntity = this.getUserEntity()

    const create = userEntity.create({
      login,
      creater: true,
    })

    return userEntity.save(create)
  }
  getUser = () => {
    const userEntity = this.getUserEntity()

    return userEntity.findOne({
      where: {
        creater: true,
      }
    })
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
