import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkEntity } from './entities/talk.entity';

@Module({
  controllers: [TalkController],
  providers: [TalkService],
  imports: [TypeOrmModule.forFeature([TalkEntity])]
})
export class TalkModule {}
