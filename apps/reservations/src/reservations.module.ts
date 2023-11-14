import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservations.repositoty';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([
    {name: ReservationDocument.name, schema: ReservationSchema}
  ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
      })
    }),
  
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
