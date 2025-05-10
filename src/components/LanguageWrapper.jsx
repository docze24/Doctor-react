import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider, LanguageContext } from "../contentApi/LanguageContext"; 

const LanguageWrapper = ({ children }) => {
  return (
    <LanguageProvider> 
      <LanguageContent>{children}</LanguageContent>
    </LanguageProvider>
  );
};

const LanguageContent = ({ children }) => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    console.error(" LanguageContext is undefined! Make sure LanguageProvider is wrapping the component.");
    return null;
  }

  const { language, changeLanguage } = languageContext;

  useEffect(() => {
    if (lang && lang !== language) {
      changeLanguage(lang);
    } else if (!lang) {
      navigate(`/${language}`, { replace: true });
    }
  }, [lang, language, navigate]);

  return <>{children}</>;
};

export default LanguageWrapper;


// import React, { useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { LanguageContext } from "../contentApi/LanguageContext";

// const LanguageWrapper = ({ children }) => {
//   const { lang } = useParams();
//   const navigate = useNavigate();
//   const languageContext = useContext(LanguageContext);

//   if (!languageContext) {
//     console.error("❌ LanguageContext is undefined! Make sure LanguageProvider is wrapping the component.");
//     return null;
//   }

//   const { language, changeLanguage } = languageContext;

//   useEffect(() => {
//     if (!lang) {
//       navigate(`/${language}`, { replace: true });
//     } else if (lang !== language) {
//       changeLanguage(lang);
//     }
//   }, [lang, language, navigate, changeLanguage]);

//   return <>{children}</>;
// };

// export default LanguageWrapper;
