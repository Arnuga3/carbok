import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enGB from "./en-GB.json";
import ruRU from "./ru-RU.json";

export const resources = {
  enGB: {
      translation: enGB,
  },
  ruRU: {
      translation: ruRU,
  }
};

i18n.use(initReactI18next).init({
  lng: "enGB",
  resources,
});
