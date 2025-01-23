import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Load translations using HTTP
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}.json', // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
