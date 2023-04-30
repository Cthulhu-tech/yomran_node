import { TypeOrmModule } from '@nestjs/typeorm'
import { Entities } from './entity'

export const OrmConnection = TypeOrmModule.forRootAsync({
  useFactory: async () => ({
    type: 'mysql',
    host: process.env.host,
    port: Number(process.env.port),
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    entities: Entities,
    synchronize: true,
  }),
})
