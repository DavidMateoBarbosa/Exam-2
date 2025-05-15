import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConferenceModule } from './conference/conference.module';
import { TalkModule } from './talk/talk.module';
import { SpeakerModule } from './speaker/speaker.module';
import { AttendeeModule } from './attendee/attendee.module';
import { StaffMemberModule } from './staff-member/staff-member.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env["DB_HOST"],
      port: 5432,
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"],
      entities: [__dirname + "/**/entities/*.entity{.ts,.js}"],
      dropSchema: true,
      synchronize: true,
    }),
    ConferenceModule,
    TalkModule,
    SpeakerModule,
    AttendeeModule,
    StaffMemberModule,
  ]
})
export class AppModule {}
