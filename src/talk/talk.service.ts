import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';

@Injectable()
export class TalkService {
  create(createTalkDto: CreateTalkDto) {
    return 'This action adds a new talk';
  }

  findAll() {
    return `This action returns all talk`;
  }

  findOne(id: string) {
    return `This action returns a #${id} talk`;
  }

  update(id: string, updateTalkDto: UpdateTalkDto) {
    return `This action updates a #${id} talk`;
  }

  remove(id: string) {
    return `This action removes a #${id} talk`;
  }
}
