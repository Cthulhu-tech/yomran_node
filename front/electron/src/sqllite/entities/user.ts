import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Setting } from "./setting"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Setting, (setting) => setting.user)
    settings: Setting[]
}
