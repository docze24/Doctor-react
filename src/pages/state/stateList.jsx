import React, { useState,useContext } from 'react'
import Footer from '@/components/shared/Footer'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { LanguageContext } from '../../contentApi/LanguageContext'; 
import StateList from '../../components/state/StateTable';
import { FiAlignRight, FiArrowLeft,FiPlus } from 'react-icons/fi'
import { Button } from 'react-bootstrap';
const StatePage = () => {
      const {t}=useContext(LanguageContext);
      const navigate = useNavigate();
    return (
        <>
           <div className="page-header">
            <div className="page-header-left d-flex align-items-center">
                <div className="page-header-title">
                    <div className="d-flex d-ms-none gap-2">
                        <Link to="/en/users" onClick={() => setOpenSidebar(false)} className="page-header-right-close-toggle">
                            <FiArrowLeft size={16} className="me-2 mt-1" />
                        </Link>
                        <h5 className="m-b-10 text-capitalize h4">State Managment</h5>
                    </div>
                </div>  
            </div>
            <div className="page-header-right ms-auto">
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    {/* <Link to="/leads/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create User</span>
                    </Link> */}
                    <Button variant="primary" size="lg" className="fw-semibold px-4" onClick={() => navigate("/en/state/create")}  >
                        <FiPlus size={16} className='me-2' />
                        Add State
                     </Button>
                </div>
            </div>
        </div>
            <div className='main-content'>
                <div className='row'>
                <div className="col-lg-12">
                  <div className="card stretch stretch-full function-table">
                      <div className="card-body p-0">
                            <div className="table-responsive">
                              
                               <StateList/>
                             
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default StatePage