import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async index(): Promise<string> {
        return "EXAM DATABASE";
    }
}
