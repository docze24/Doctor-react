import React, { useState,useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiAlignRight, FiArrowLeft } from 'react-icons/fi'
import { LanguageContext } from '../../contentApi/LanguageContext'; 

const PatientHeader = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState(false)
    const pathName = useLocation().pathname

     const {t}=useContext(LanguageContext);
   
    return (
        <div className="page-header">
            <div className="page-header-left d-flex align-items-center">
                <div className="page-header-title d-flex gap-2">
                <FiArrowLeft size={16} className="me-2" />
                    <h5 className="m-b-10 text-capitalize">{t("patientmanagement", { ns: "heading" })}</h5>
                </div>
            </div>
            <div className="page-header-right ms-auto">
                <div className={`page-header-right-items ${openSidebar ? "page-header-right-open" : ""}`}>
                    <div className="d-flex d-md-none">
                        <Link to="#" onClick={() => setOpenSidebar(false)} className="page-header-right-close-toggle">
                            <FiArrowLeft size={16} className="me-2" />
                            <span>{t("back", { ns: "button" })}</span>
                        </Link>
                    </div>
                    {children}
                </div>
                <div className="d-md-none d-flex align-items-center">
                    <Link to="#" onClick={() => setOpenSidebar(true)} className="page-header-right-open-toggle">
                        <FiAlignRight className="fs-20" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PatientHeader