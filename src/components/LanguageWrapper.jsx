import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LanguageWrapper = ({ children }) => {
  const { lang } = useParams(); // Get language from URL
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang); // Update language
    }
  }, [lang, i18n]);

  return <>{children}</>; // Render child components
};

export default LanguageWrapper;
