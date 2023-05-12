import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm"
import { Setting } from "./setting"

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @OneToMany(() => Setting, (setting) => setting.user)
    settings: Setting[]
}
