import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Subject} from "./Subject"
@Entity()
export class Teacher {

    @PrimaryGeneratedColumn("uuid")
    id: String;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;
    

    @Column()
    password: string;

    @OneToMany(() => Subject, subject => subject.teacher, {
        eager: true
    })
    subjects: Subject[];

}
