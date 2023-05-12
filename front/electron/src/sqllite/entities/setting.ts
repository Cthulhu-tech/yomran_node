import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { User } from "./user"

export enum LanguageEnum {
    english = 'english',
    русский = 'русский'
}

@Entity('setting')
export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 'default' })
    name: string

    @Column({ 
        enum: LanguageEnum,
        default: LanguageEnum.english
    })
    lang: LanguageEnum

    @Column({ default: 0 })
    themes: boolean

    @ManyToOne(() => User, (user) => user.settings)
    user: User
}
