import { MessageEntity } from "src/message/entities/message.entity"
import { ChatEntity } from "src/chats/entities/chat.entity"
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    ManyToMany
} from "typeorm"

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 55
    })
    login: string

    @Column({
        length: 255
    })
    email: string

    @Column({
        length: 255,
        nullable: true,
    })
    token: string

    @Column({
        length: 535
    })
    password: string

    @Column('bool', {
        default: false
    })
    delete: boolean

    @Column('bool', {
        default: false
    })
    confirmed: boolean

    @CreateDateColumn()
    create_time: Date
    
    @OneToMany(() => MessageEntity, (message) => message)
    message: MessageEntity[]

    @OneToMany(() => ChatEntity, (chat) => chat)
    chat: ChatEntity[]

    @ManyToMany(() => ChatEntity, (chat) => chat.users)
    chats: ChatEntity[]
}
