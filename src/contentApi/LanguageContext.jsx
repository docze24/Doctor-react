import React, { createContext, useState, useEffect } from "react";
import i18n from "i18next";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  //  console.log(" LanguageContext Mounted!");
  const navigate = useNavigate();
  const { t ,i18n} = useTranslation();
  const { lang } = useParams();
  const supportedLanguages = ["en", "fr", "de"];
  const defaultLanguage = "en";

  const [language, setLanguage] = useState(
    supportedLanguages.includes(lang) ? lang : Cookies.get("language") || defaultLanguage
  );

 // console.log(" Initial Language:", language);
 // console.log(" `useParams()` lang:", lang); //  Debugging
 


  useEffect(() => {
   // console.log("`useEffect()` Triggered - URL Changed:", lang); //  Should print when lang changes

    if (lang && lang !== language) {
        console.log(" URL Changed → Updating Context Language to:", lang);
      setLanguage(lang);
      i18n.changeLanguage(lang);
      Cookies.set("language", lang, { expires: 7 });

       //  Force reload translations
    i18n.reloadResources(lang);
    }
  }, [lang]); 

  const changeLanguage = (newLang) => {
    console.log(" Changing Language via Modal:", newLang);
    if (newLang !== language) {
      setLanguage(newLang);
      i18n.changeLanguage(newLang);
      Cookies.set("language", newLang, { expires: 7 });

      const newPath = `/${newLang}${window.location.pathname.replace(/^\/[a-z]{2}/, "")}`;
      navigate(newPath, { replace: true });

    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 100);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage ,t ,i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};
