import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {ConferenceEntity} from "../../conference/entities/conference.entity";

@Entity("Attendees")
export class AttendeeEntity {
    @PrimaryGeneratedColumn(
        "uuid",
        {
            name: "ID"
        }
    )
    id: string;

    @Column({
        name: "Name",
    })
    name: string;

    @Column({
        name: "University"
    })
    university: string;

    @Column({
        name: "Email"
    })
    email: string;

    @OneToMany(
        function(): typeof ConferenceEntity {
            return ConferenceEntity;
        },
        function(conference: ConferenceEntity): AttendeeEntity {
            return conference.attendee;
        }
    )
    conferences: ConferenceEntity[];
}
