import { useContext } from 'react';
import React  from 'react'
import { LanguageContext } from '../../contentApi/LanguageContext';


const Footer = () => {

    const { t } = useContext(LanguageContext);

    return (
        <footer className="footer">
            <p className="fs-11 text-muted fw-medium text-uppercase mb-0 copyright">
                <span>{t("copyright",{ns:"labels"})} </span>
                {new Date().getFullYear()}
            </p>
            <div className="d-flex align-items-center gap-4">
                <a href="#" className="fs-11 fw-semibold text-uppercase">{t("help",{ns:"labels"})}</a>
                <a href="#" className="fs-11 fw-semibold text-uppercase">{t("terms",{ns:"labels"})}</a>
                <a href="#" className="fs-11 fw-semibold text-uppercase">{t("privacy",{ns:"labels"})}</a>
            </div>
        </footer>
    )
}

export default Footer