import { createRoom } from "../../interface/interface"
import { LanguageEnum } from "../entities/setting"
import { SqlLite } from "../sqllite"

import { sign } from 'jsonwebtoken'

export class UserInfo {
    private sql: SqlLite
    constructor(sql: SqlLite) {
        this.sql = sql
    }
    async getUserSetting (login: string) {
        const user = this.sql.getUserRepository()
        return await user.findOne({
            relations: {
                settings: true,
            },
            where: {
                login,
            }
        })
    }
    async createUserSetting (login: string) {
        const user = this.sql.getUserRepository()
        const setting = this.sql.getSettingRepository()

        const createUser = await user.create({ login })
        const saveUser = await user.save(createUser)
        const createSetting = await setting.create({ user: saveUser })
        await setting.save(createSetting)

        return await user.findOne({
            relations: {
                settings: true,
            },
            where: {
                login,
            }
        })
    }
    async changeLanguage(lang: string, id: number, login: string) {
        const user = this.sql.getUserRepository()
        const setting = this.sql.getSettingRepository()

        const findSeting = await setting.findOne({
            where: {
                id,
            }
        })
    
        if(findSeting) {
            findSeting.lang = lang as LanguageEnum
            await setting.save(findSeting)
        }

        return await user.findOne({
            relations: {
                settings: true,
            },
            where: {
                login,
            }
        })
    }
    async createRoom ({ id, name }: createRoom) {
        const token = await sign({ id, name }, name + id)
        return token
    }
}
