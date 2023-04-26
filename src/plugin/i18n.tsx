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
          "create_room": "Create room",
          "cancel": "Cancel",
          "room_name": "Room name",
          "room_password": "Password in room",
          "send": "Send",
          "open": "Connect to the room",
          "connect": "Connect",
          "token": "Connection token",
          "login": "Your login",
          "next": "Next",
          'Minimum length 3 character.': 'Minimum length 3 character.',
          'Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter': 'Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'
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
          "send": "Отправить",
          "open": "Подключиться к комнате",
          "connect": "вход",
          "token": "Токен подключения",
          "login": "Ваш логин",
          "next": "Продолжить",
          'Minimum length 3 character.': 'Минимальная длина 3 символа',
          'Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter': 'Пароль длиной от 6 до 20 символов, содержащий как минимум одну цифру, одну заглавную и одну строчную букву'
        }
      }
    },
    lng: "ru",
    fallbackLng: "ru",

    interpolation: {
      escapeValue: false
    }
})
