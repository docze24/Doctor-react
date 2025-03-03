import { useContext } from 'react'
import EditCity from '@/components/city/EditCityForm';
import Footer from '@/components/shared/Footer'
import {  FiArrowLeft } from 'react-icons/fi'
import { LanguageContext } from '../../contentApi/LanguageContext'; 
import { useNavigate } from 'react-router-dom';

const EditCities = () => {
     const {t}=useContext(LanguageContext);
     const navigate = useNavigate();

     const handleNavigation = () => {
        navigate('/en/city'); 
    };


    return (
        <>
            <div className="page-header">
                        <div className="page-header-left d-flex align-items-center">
                            <div className="page-header-title d-flex gap-2">
                            <FiArrowLeft size={16} className="me-2 mt-1" onClick={handleNavigation} />
                             <h5 className="m-b-10 text-capitalize h4">Edit City</h5>
                            </div>
                        </div>
                        
                    </div>  
            <div className='main-content'>
                <div className='row'>
                <EditCity/>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EditCities;