import { TalkEntity } from "src/talk/entities/talk.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Speakers")
export class SpeakerEntity {
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
        name: "Affiliation",
    })
    affiliation: string;

    @Column({
        name: "Email"
    })
    email: string;

    @OneToMany(
        function(): typeof TalkEntity {
            return TalkEntity;
        },
        function(talk: TalkEntity): SpeakerEntity
        {
            return talk.speaker;
        },
    )
    talks: TalkEntity[];

}
