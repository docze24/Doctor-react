import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import Cookies from "js-cookie";

//  URL se ya Cookie se language detect karna
const selectedLang = window.location.pathname.split("/")[1] || Cookies.get("language") || "en";

i18n
  .use(HttpBackend) //  Backend se translations load karega
  .use(LanguageDetector) //  Browser se language detect karega
  .use(initReactI18next) //  React ke liye initialize karega
  .init({
    fallbackLng: selectedLang, //  Default language
    supportedLngs: ["en", "fr", "de"], //  Available languages
    debug: false, //  Debugging ke liye console logs
    detection: {
      order: ["path", "cookie", "localStorage", "navigator"], // URL path priority
      caches: ["cookie"], //  Cookies me store karega
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', //  Translation files ka path
    },
    ns: ["input","message","labels","button","tables","heading"], //  Define all namespaces you are using
    defaultNS: "input",

    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;
