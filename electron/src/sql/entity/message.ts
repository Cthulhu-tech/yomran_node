import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Chat } from './chat';
import { User } from './user';

@Entity("messages")
export class Message extends BaseEntity {
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