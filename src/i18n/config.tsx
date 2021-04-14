import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultAppSettings } from "../resources/config";
import enGB from "./en-GB.json";
import ruRU from "./ru-RU.json";

const defaultLanguage = defaultAppSettings.language;

export const resources = {
  "en-GB": {
    translation: enGB,
  },
  "ru-RU": {
    translation: ruRU,
  },
};

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  resources,
});
