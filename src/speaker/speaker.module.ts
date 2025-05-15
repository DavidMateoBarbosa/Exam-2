import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { SpeakerController } from './speaker.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeakerEntity } from './entities/speaker.entity';

@Module({
  controllers: [SpeakerController],
  providers: [SpeakerService],
  imports: [TypeOrmModule.forFeature([SpeakerEntity])]
})
export class SpeakerModule {}
