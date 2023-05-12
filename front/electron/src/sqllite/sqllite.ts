import { Setting } from "./entities/setting"
import { User } from "./entities/user"
import { DataSource } from "typeorm"

export class SqlLite {
    private user: User
    private setting: Setting
    private connection: DataSource
    private static instance: SqlLite
    constructor() {
        if (SqlLite.instance) 
            return SqlLite.instance
        SqlLite.instance = this
        this.createConnection()
        this.setEntities()
    }
    private setEntities = () => {
        this.user = new User()
        this.setting = new Setting()
    }
    private createConnection = async () => {
        this.connection = new DataSource({
            type: "sqlite",
            database: './setting',
            entities: [User, Setting],
        })
    }
    getConnection = () => {
        return this.connection
    }
    getUserEntities = () => {
        return this.user
    }
    getSettingEntities = () => {
        return this.setting
    }
}
