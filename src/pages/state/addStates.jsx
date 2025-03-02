import { useContext } from 'react'
import AddStates from '../../components/state/AddStateForm';
import Footer from '@/components/shared/Footer'
import {  FiArrowLeft } from 'react-icons/fi'
import { LanguageContext } from '../../contentApi/LanguageContext'; 
import { useNavigate } from 'react-router-dom';

const AddState = () => {
     const {t}=useContext(LanguageContext);
      const navigate = useNavigate();
     
          const handleNavigation = () => {
             navigate('/en/state'); 
         };
     
    return (
        <>
            <div className="page-header">
                        <div className="page-header-left d-flex align-items-center">
                            <div className="page-header-title d-flex gap-2">
                            <FiArrowLeft size={16} className="me-2 mt-1" onClick={handleNavigation} />
                                <h5 className="m-b-10 text-capitalize h4">Add State</h5>
                            </div>
                        </div>
                        
                    </div>  
            <div className='main-content'>
                <div className='row'>
                    <AddStates />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddState;