import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const ResetForm = ({ path }) => {
     const { t ,i18n } = useTranslation(['input', 'message']);
    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">{t("resetTitle", { ns: "message" })}</h2>
            <h4 className="fs-13 fw-bold mb-2">{t("resetSubtitle", { ns: "message" })}</h4>
            <p className="fs-12 fw-medium text-muted">{t("resetDescription", { ns: "message" })}</p>
            <form action="auth-resetting-cover.html" className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input className="form-control" placeholder={t("emailOrUsername", { ns: "input" })}  required />
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">{t("resetButton", { ns: "input" })} </button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span>{t("dontHaveAccount", { ns: "message" })}</span>
                <Link to={`/${i18n.language}/signup`} className="fw-bold"> {t("createAccount", { ns: "message" })} </Link>
            </div>
        </>
    )
}

export default ResetForm