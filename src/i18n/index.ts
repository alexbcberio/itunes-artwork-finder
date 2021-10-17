import Vue from "vue";
import VueI18Next from "@panter/vue-i18next";
import en from "./locales/en";
import i18next from "i18next";

Vue.use(VueI18Next);

i18next.init({
  supportedLngs: ["en"],
  fallbackLng: "en",
  resources: {
    en,
  },
});

const i18n = new VueI18Next(i18next);

export default i18n;
