import { Injectable } from '@nestjs/common';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';

@Injectable()
export class ConferenceService {
  create(createConferenceDto: CreateConferenceDto) {
    return 'This action adds a new conference';
  }

  findAll() {
    return `This action returns all conference`;
  }

  findOne(id: string) {
    return `This action returns a #${id} conference`;
  }

  update(id: string, updateConferenceDto: UpdateConferenceDto) {
    return `This action updates a #${id} conference`;
  }

  remove(id: string) {
    return `This action removes a #${id} conference`;
  }
}
