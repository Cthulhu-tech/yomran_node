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
        }
      },
      ru: {
        translation: {
          "chat_list_name": "Список сохранённых чатов",
          "create": 'создать конференцию',
        }
      }
    },
    lng: "ru",
    fallbackLng: "ru",

    interpolation: {
      escapeValue: false
    }
})
