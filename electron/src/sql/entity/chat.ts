import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Message } from './message';

@Entity("chat")
export class Chat {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name?: string

    @OneToMany(type => Message, message => message.sender)
    messages?: Message[]
}