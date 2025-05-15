import { ConferenceEntity } from "src/conference/entities/conference.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("StaffMembers")
export class StaffMemberEntity {
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
        name: "Role",
        type: "enum",
        enum: ["..."],
    })
    role: "...";

    @OneToMany(
        function(): typeof ConferenceEntity {
            return ConferenceEntity;
        },
        function(conference: ConferenceEntity): StaffMemberEntity {
            return conference.organizer;
        }
    )
    conferences: ConferenceEntity[];
}
