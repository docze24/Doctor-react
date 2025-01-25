import React from "react";
import { FiEye, FiHash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";



const RegisterForm = ({ path }) => {
    
  const { t , i18n } = useTranslation(['input', 'message']);
  
  return (
    <>
      <h2 className="fs-20 fw-bolder mb-4">{t('registerTitle', { ns: 'message' })}</h2>
      <h4 className="fs-13 fw-bold mb-2">{t("registerSubtitle", { ns: 'message' })}</h4>
      <p className="fs-12 fw-medium text-muted">{t("registerDescription", { ns: 'message' })}</p>
      <form action="index.html" className="w-100 mt-4 pt-2">
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder={t("fullName",{ns:'input'})}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            className="form-control"
            placeholder={t("email",{ns:'input'})}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            className="form-control"
            placeholder={t("username",{ns:'input'})}
            required
          />
        </div>
        <div className="mb-4 generate-pass">
          <div className="input-group field">
            <input
              type="password"
              className="form-control password"
              id="newPassword"
              placeholder={t("password")}
            />
            <div
              className="input-group-text c-pointer gen-pass"
              data-bs-toggle="tooltip"
              title={t("generatePassword")}
            >
              <FiHash size={16} />
            </div>
            <div
              className="input-group-text border-start bg-gray-2 c-pointer"
              data-bs-toggle="tooltip"
              title={t("showHidePassword", { ns: 'message' })}
            >
              <FiEye size={16} />
            </div>
          </div>
          <div className="progress-bar mt-2">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder={t("passwordAgain", { ns: 'message' })}
            required
          />
        </div>
        <div className="mt-4">
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="receiveMial"
              required
            />
            <label
              className="custom-control-label c-pointer text-muted"
              htmlFor="receiveMial"
              style={{ fontWeight: "400 !important" }}
            >
              {t("receiveEmails", { ns: 'message' })}
            </label>
          </div>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="termsCondition"
              required
            />
            <label
              className="custom-control-label c-pointer text-muted"
              htmlFor="termsCondition"
              style={{ fontWeight: "400 !important" }}
            >
              {t("agreeTerms", { ns: 'message' })}
            </label>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-lg btn-primary w-100">
            {t("createAccount", { ns: 'message' })}
          </button>
        </div>
      </form>
      <div className="mt-5 text-muted">
        <span>{t("alreadyHaveAccount", { ns: 'message' })}</span>
        <Link to={`/${i18n.language}/login`} className="fw-bold">
          {" "}
          {t("login", { ns: 'message' })}
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
