import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Chat } from './chat';
import { User } from './user';

@Entity("messages")
export class Message {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(type => User)
    @JoinColumn()
    sender?: User

    @ManyToOne(type => Chat)
    @JoinColumn()
    chat?: Chat

    @Column()
    text?: string
}