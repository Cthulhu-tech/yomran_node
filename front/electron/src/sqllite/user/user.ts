import { SqlLite } from "../sqllite"

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
}
