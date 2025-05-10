import React from 'react';
import { FiEye, FiPlus, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import topTost from '@/utils/topTost';
import { LanguageContext } from "../../contentApi/LanguageContext";
import { useContext } from 'react'


const CustomersViewHeader = () => {
     const {t,i18n} =useContext(LanguageContext);
   
    
    const handleClick = () => {
        topTost()
    };
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a href="#" className="btn btn-icon btn-light-brand" onClick={handleClick}>
                <FiStar size={16} />
            </a>
            <a href="#" className="btn btn-icon btn-light-brand">
                <FiEye size={16} className='me-2' />
                <span>{t("follow",{ns:"button"})}</span>
            </a>
            <Link to={`/${i18n.language}/profile/edit`} className="btn btn-primary">
                <FiPlus size={16} className='me-2' />
                <span>{t("editProfile",{ns:"button"})}</span>
            </Link>
        </div>
    )
}

export default CustomersViewHeader