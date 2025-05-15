import { Injectable } from '@nestjs/common';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';

@Injectable()
export class StaffMemberService {
  create(createStaffMemberDto: CreateStaffMemberDto) {
    return 'This action adds a new staffMember';
  }

  findAll() {
    return `This action returns all staffMember`;
  }

  findOne(id: string) {
    return `This action returns a #${id} staffMember`;
  }

  update(id: string, updateStaffMemberDto: UpdateStaffMemberDto) {
    return `This action updates a #${id} staffMember`;
  }

  remove(id: string) {
    return `This action removes a #${id} staffMember`;
  }
}
