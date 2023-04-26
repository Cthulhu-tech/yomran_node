import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Chat } from './chat'
import { User } from './user'

@Entity("messages")
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(type => User, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    sender: User

    @ManyToOne(type => Chat, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    chat: Chat

    @CreateDateColumn()
    create_time: Date;

    @Column()
    text?: string
}