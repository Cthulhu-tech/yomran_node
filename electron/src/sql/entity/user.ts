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
    login?: string

    @OneToMany(type => Message, message => message.sender)
    messages?: Message[]
}