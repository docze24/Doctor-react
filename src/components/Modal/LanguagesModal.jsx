import React, { useContext } from "react";
import { LanguageContext } from "../../contentApi/LanguageContext"; 
import { useTranslation } from "react-i18next";

const languagesList = [
  { id: 1, flag: "/images/flags/1x1/nl.svg", language_name: "Dutch", lang: "nl" },
  { id: 2, flag: "/images/flags/1x1/us.svg", language_name: "English", lang: "en" },
  { id: 3, flag: "/images/flags/1x1/fr.svg", language_name: "French", lang: "fr" },
];

const LanguagesModal = () => {
  console.log(" LanguagesModal Loaded!");
  
  const { language, changeLanguage } = useContext(LanguageContext);
  
  const { t } = useContext(LanguageContext);

  const currentLanguage = languagesList.find((lang) => lang.lang === language) || languagesList[1]; // Default English

  return (
    <div className="dropdown nxl-h-item nxl-header-language d-none d-sm-flex">
      <div className="nxl-head-link me-0 nxl-language-link" data-bs-toggle="dropdown" data-bs-auto-close="outside">
        <img src={currentLanguage.flag} alt="currentLanguage.language_name" className="img-fluid wd-20" />
      </div>
      <div className="dropdown-menu nxl-h-dropdown nxl-language-dropdown">
        <div className="language-items-wrapper">
          <div className="select-language px-4 py-2">
            <h6 className="mb-0">{t("select-language")}</h6>
          </div>
          <div className="row px-4 pt-3">
            {languagesList.map(({ flag, id, language_name, lang }) => (
              <div key={id} className="col-sm-4 border-0 ">
                <button className="d-flex align-items-center gap-1 w-80" onClick={() => changeLanguage(lang)}>
                  <div className="avatar-image avatar-sm">
                    <img src={flag} alt={language_name} className="img-fluid" />
                  </div>
                  <span>{language_name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesModal;
