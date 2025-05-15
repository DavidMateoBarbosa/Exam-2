import { Module } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { AttendeeController } from './attendee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeeEntity } from './entities/attendee.entity';

@Module({
  controllers: [AttendeeController],
  providers: [AttendeeService],
  imports: [TypeOrmModule.forFeature([AttendeeEntity])]
})
export class AttendeeModule {}
