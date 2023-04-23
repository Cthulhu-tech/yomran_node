import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Message } from './message';

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    login: string

    @Column({type: 'boolean', default: false})
    creater: boolean

    @OneToMany(type => Message, message => message.sender, { nullable: true })
    messages: Message[]
}