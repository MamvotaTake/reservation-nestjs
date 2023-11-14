import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser'
import { AuthModule } from './auth.module';
import {ValidationPipe} from '@nestjs/common'
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService)
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
