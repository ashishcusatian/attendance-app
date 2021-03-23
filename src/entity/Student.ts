import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";


@Entity()
export class Student {

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
}
