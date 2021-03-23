import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {Teacher} from "./Teacher"
@Entity()
export class Subject {

    @PrimaryGeneratedColumn("uuid")
    id: String;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Teacher, teacher => teacher.subjects)
    teacher: Teacher;

}
