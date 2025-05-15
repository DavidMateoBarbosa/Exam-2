import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { ConferenceController } from './conference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConferenceEntity} from "./entities/conference.entity";

@Module({
  controllers: [ConferenceController],
  providers: [ConferenceService],
  imports: [TypeOrmModule.forFeature([ConferenceEntity])]
})
export class ConferenceModule {}
