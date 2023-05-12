import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { MessageModule } from './message/message.module'
import { UsersModule } from './users/users.module'
import { ChatsModule } from './chats/chats.module'

import { UserEntity } from './users/entities/user.entity'
import { TokenMiddleware } from './middelwear/authCheck'
import { OrmConnection } from './utils/mysql/mysql'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnvConfig } from './utils/env/env'

@Module({
  imports: [
    EnvConfig,
    OrmConnection,
    UsersModule,
    ChatsModule,
    MessageModule,
    AuthModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        { path: '/auth/refresh', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/logout', method: RequestMethod.POST },
        { path: '/users', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
