import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";


@Entity()
export class Enroll {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid")
    studentId: string;

    @Column("uuid")
    subjectId: string;

}
