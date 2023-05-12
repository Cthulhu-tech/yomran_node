import { entities } from "./entities/entries"
import { Setting } from "./entities/setting"
import { User } from "./entities/user"
import { DataSource } from "typeorm"

export class SqlLite {
    private connection: DataSource
    private static instance: SqlLite
    constructor() {
        if (SqlLite.instance) 
            return SqlLite.instance
        SqlLite.instance = this
        this.createConnection()
    }
    private createConnection = () => {
        this.connection = new DataSource({
            type: "sqlite",
            database: './you_setting',
            synchronize: true,
            logging: true,
            entities,
        })
        this.connection.initialize()
    }
    getConnection = () => {
        return this.connection
    }
    getUserRepository = () => {
        return this.connection.getRepository(User)
    }
    getSettingRepository = () => {
        return this.connection.getRepository(Setting)
    }
}
