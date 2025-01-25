import React from 'react'
import { FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LoginForm = ({ registerPath, resetPath }) => {

      const { t ,i18n } = useTranslation(['input', 'message']);

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">{t("login", { ns: "message" })}</h2>
            <h4 className="fs-13 fw-bold mb-2">{t("loginSubtitle", { ns: "message" })}</h4>
            <p className="fs-12 fw-medium text-muted">{t("welcomeMessage", { ns: "message" })}</p>
            <form action="index.html" className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input type="email" className="form-control" placeholder={t("emailOrUsername",{ns:"input"})}  required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder={t("password",{ns:"input"})} required />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">{t("rememberMe",{ns:"input"})}</label>
                        </div>
                    </div>
                    <div>
                        <Link to={`/${i18n.language}/forgot-password`} className="fs-11 text-primary">{t("forgetPassword",{ns:"input"})}</Link>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">{t("login", { ns: "message" })}</button>
                </div>
            </form>
            <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative"><span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">or</span></div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title={t("loginWithFacebook",{ns:"input"})}>
                        <FiFacebook size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title={t("loginWithTwitter",{ns:"input"})}>
                        <FiTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title={t("loginWithGithub",{ns:"input"})}>
                        <FiGithub size={16} className='text' />
                    </a>
                </div>
            </div>
            <div className="mt-5 text-muted">
                <span> {t("dontHaveAccount",{ns:"input"})}</span>
                <Link to={`/${i18n.language}/signup`} className="fw-bold"> {t("createAccount",{ns:"input"})}</Link>
            </div>
        </>
    )
}

export default LoginForm