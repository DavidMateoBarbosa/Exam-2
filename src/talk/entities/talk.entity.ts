import { ConferenceEntity } from "src/conference/entities/conference.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpeakerEntity } from "../../speaker/entities/speaker.entity";

@Entity("Talks")
export class TalkEntity {
    @PrimaryGeneratedColumn(
        "uuid",
        {
            name: "ID"
        }
    )
    id: string;

    @ManyToOne(
        function(): typeof SpeakerEntity {
            return SpeakerEntity;
        },
        function(speaker: SpeakerEntity): TalkEntity[] {
            return speaker.talks;
        },
        {
            onDelete: "CASCADE",
        }
    )
    speaker: SpeakerEntity;

    @ManyToOne(
        function(): typeof ConferenceEntity {
            return ConferenceEntity;
        },
        function (conference: ConferenceEntity): TalkEntity[] {
            return conference.talks;
        },
        {
            onDelete: "CASCADE",
        }
    )
    conference: ConferenceEntity;
}
