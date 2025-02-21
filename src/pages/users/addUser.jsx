import { useContext } from 'react'
import AddUser from '@/components/users/addUsers'
import Footer from '@/components/shared/Footer'
import {  FiArrowLeft } from 'react-icons/fi'
import { LanguageContext } from '../../contentApi/LanguageContext'; 

const addUser = () => {
     const {t}=useContext(LanguageContext);
    return (
        <>
            <div className="page-header">
                        <div className="page-header-left d-flex align-items-center">
                            <div className="page-header-title d-flex gap-2">
                            <FiArrowLeft size={16} className="me-2 mt-1" />
                                <h5 className="m-b-10 text-capitalize h4">Add User</h5>
                            </div>
                        </div>
                        
                    </div>  
            <div className='main-content'>
                <div className='row'>
                    <AddUser />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default addUser;