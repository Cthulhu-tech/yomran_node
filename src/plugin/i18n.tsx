import { initReactI18next } from "react-i18next"
import i18n from "i18next"

export const _i18n = i18n
.use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "chat_list_name": "Chat save list",
          "create": 'Create conference',
          "create_room": "Create",
          "cancel": "Cancel",
          "room_name": "Room name",
          "room_password": "Password in room",
          "send": "Send"
        }
      },
      ru: {
        translation: {
          "chat_list_name": "Список сохранённых чатов",
          "create": 'создать конференцию',
          "create_room": "создать",
          "cancel": "отмена",
          "room_name": "Название комнаты",
          "room_password": "Пароль от комнаты",
          "send": "Отправить"
        }
      }
    },
    lng: "ru",
    fallbackLng: "ru",

    interpolation: {
      escapeValue: false
    }
})
