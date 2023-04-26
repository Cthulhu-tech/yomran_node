import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Message } from './message';

@Entity("chat")
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => Message, message => message.sender, { onDelete: 'CASCADE' })
    messages: Message[]
}