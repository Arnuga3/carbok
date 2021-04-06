import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enGB from "./en-GB.json";

export const resources = {
  enGB: {
      translation: enGB,
  },
};

i18n.use(initReactI18next).init({
  lng: "enGB",
  resources,
});
