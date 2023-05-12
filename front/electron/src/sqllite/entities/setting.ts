import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lang: string

    @Column()
    themes: boolean

    @ManyToOne(() => User, (user) => user.settings)
    user: User
}
