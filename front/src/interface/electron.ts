import { changeLanguage, notificationType, userLoginType } from '../../electron/src/interface/interface'
import { Setting } from '../../electron/src/sqllite/entities/setting'
import { User } from '../../electron/src/sqllite/entities/user'

export interface ElectronWindow extends Window {
    api: {
        closeAplication: ()  => void
        minAplication: ()  => void
        maxAplication: ()  => void
        notification: ({ message, chat }: notificationType) => void
        getUserSetting: ({ login }: userLoginType) => Promise<User | null>
        createUserSetting: ({ login }: userLoginType) => Promise<User | null>
        changeLanguage: ({ id, language, login }: changeLanguage) => Promise<User | null>
    }
}
