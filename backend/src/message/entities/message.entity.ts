import { ChatEntity } from "src/chats/entities/chat.entity"
import { UserEntity } from "src/users/entities/user.entity"
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    ManyToOne,
    CreateDateColumn
} from "typeorm"

@Entity('messages')
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 535
    })
    message: string

    @Column('bool', {
        default: false
    })
    delete: boolean

    @CreateDateColumn()
    create_time: Date

    @ManyToMany(() => ChatEntity, (message) => message.messages)
    chats: MessageEntity[]

    @ManyToOne(() => UserEntity, (user) => user)
    message_creater: UserEntity
}
