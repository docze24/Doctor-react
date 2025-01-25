
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Importing history hook

const languagesList = [
  { id: 4, flag: "/images/flags/1x1/nl.svg", language_name: "Dutch", lang: "nl" },
  { id: 5, flag: "/images/flags/1x1/us.svg", language_name: "English", lang: "en" },
  { id: 6, flag: "/images/flags/1x1/fr.svg", language_name: "French", lang: "fr" },
];

const LanguagesModal = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const { t } = useTranslation(["input"]);
 

  // Function to change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);  // Changing language in i18next

   
    const currentPath = window.location.pathname.split('/').slice(2).join('/');

    // Update the URL with the selected language code
    navigate(`/${lang}/${currentPath}`);
  };

  return (
    <div className="dropdown nxl-h-item nxl-header-language d-none d-sm-flex">
      <div className="nxl-head-link me-0 nxl-language-link" data-bs-toggle="dropdown" data-bs-auto-close="outside">
        <img src="/images/flags/4x3/us.svg" alt="" className="img-fluid wd-20" />
      </div>
      <div className="dropdown-menu  nxl-h-dropdown nxl-language-dropdown">
        <div className="dropdown-divider mt-0"></div>
        <div className="language-items-wrapper">
          <div className="select-language px-4 py-2 hstack justify-content-between gap-4">
            <div className="lh-lg">
              <h6 className="mb-0"> {t("select-language", { ns: "input" })}</h6>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <div className="row px-4 pt-3">
            {
              languagesList.map(({ flag, id, language_name, lang }) => {
                return (
                  <div key={id} className="col-sm-4 border-0 ">
                    <button
                      className="d-flex align-items-center gap-1 w-80"
                      onClick={() => changeLanguage(lang)} // Correct usage of language code
                    >
                      <div className="avatar-image avatar-sm">
                        <img src={flag} alt={language_name} className="img-fluid" />
                      </div>
                      <span>{language_name}</span>
                    </button>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguagesModal;
