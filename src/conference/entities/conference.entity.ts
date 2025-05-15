import { TalkEntity } from "src/talk/entities/talk.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AttendeeEntity } from "../../attendee/entities/attendee.entity";
import { StaffMemberEntity } from "../../staff-member/entities/staff-member.entity";

@Entity("Conferences")
export class ConferenceEntity {
    @PrimaryGeneratedColumn(
        "uuid",
        {
            name: "ID"
        }
    )
    id: string;

    @OneToMany(
        function (): typeof TalkEntity {
            return TalkEntity;
        },
        function (talk: TalkEntity): ConferenceEntity {
            return talk.conference;
        }
    )
    talks: TalkEntity[];

    @ManyToOne(
        function (): typeof AttendeeEntity {
            return AttendeeEntity;
        },
        function (attendee: AttendeeEntity) {
            return attendee.conferences;
        }
    )
    attendee: AttendeeEntity;

    @ManyToOne(
        function (): typeof StaffMemberEntity {
            return StaffMemberEntity;
        },
        function (organizer: StaffMemberEntity) {
            return organizer.conferences;
        }
    )
    organizer: StaffMemberEntity;
}
