import * as cookieParser from 'cookie-parser'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  // listen app in localhost:3000
  await app.listen(3000)
}
bootstrap()
