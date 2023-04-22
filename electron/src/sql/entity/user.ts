import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Message } from './message';

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    login?: string

    @OneToMany(type => Message, message => message.sender)
    messages?: Message[]
}