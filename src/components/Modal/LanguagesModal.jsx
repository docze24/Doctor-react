import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap'; // Button component from react-bootstrap

const languagesList = [
  { id: 1, flag: "/images/flags/1x1/nl.svg", language_name: "Dutch", code: 'nl' },
  { id: 2, flag: "/images/flags/1x1/us.svg", language_name: "English", code: 'en' },
  { id: 3, flag: "/images/flags/1x1/fr.svg", language_name: "French", code: 'fr' },
];

const LanguagesModal = () => {
  const { i18n } = useTranslation();

  // Function to change language
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);  // This will change the language dynamically
  };

  return (
    <div className="dropdown nxl-h-item nxl-header-language d-none d-sm-flex">
      <div className="nxl-head-link me-0 nxl-language-link" data-bs-toggle="dropdown" data-bs-auto-close="outside">
        <img src="/images/flags/4x3/us.svg" alt="" className="img-fluid wd-20" />
      </div>
      <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-language-dropdown">
        <div className="dropdown-divider mt-0"></div>
        <div className="language-items-wrapper">
          <div className="select-language px-4 py-2 hstack justify-content-between gap-4">
            <div className="lh-lg">
              <h6 className="mb-0">Select Language</h6>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <div className="row px-4 pt-3">
            {
              languagesList.map(({ flag, id, language_name, code }) => {
                return (
                  <div key={id} className="col-sm-4 col-6 language_select">
                    <button
                      className="d-flex align-items-center gap-2 w-100"
                      onClick={() => changeLanguage(code)} // Correct usage of language code
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
};

export default LanguagesModal;
