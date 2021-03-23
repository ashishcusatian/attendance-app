import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";


@Entity()
export class Attendance {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid")
    studentId: string;

    @Column("uuid")
    subjectId: string;

    @Column()
    present: boolean;

    @Column({ type: 'date' })
    date: Date;
}
