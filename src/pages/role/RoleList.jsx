import React, { useState,useContext } from 'react'
import Footer from '@/components/shared/Footer'
import { Link, useLocation } from 'react-router-dom'
import { LanguageContext } from '../../contentApi/LanguageContext'; 
import RoleListTable from '@/components/roles/RolesList'
import { FiAlignRight, FiArrowLeft,FiPlus } from 'react-icons/fi'
const RoleList= () => {
      const {t}=useContext(LanguageContext);
    return (
        <>
           <div className="page-header">
            <div className="page-header-left d-flex align-items-center">
                <div className="page-header-title">
                    <div className="d-flex d-ms-none gap-2">
                        <Link to="#" onClick={() => setOpenSidebar(false)} className="page-header-right-close-toggle">
                            <FiArrowLeft size={16} className="me-2" />
                        </Link>
                        <h5 className="m-b-10 text-capitalize h4">Roles Managment</h5>
                    </div>
                </div>
            </div>
            <div className="page-header-right ms-auto">
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/en/user-roles/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create Role</span>
                    </Link>
                    <Link to="/en/user-roles/download_csv" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Download CSV</span>
                    </Link>
                </div>
            </div>
        </div>
            <div className='main-content'>
                <div className='row'>
                <div className="col-lg-12">
                  <div className="card stretch stretch-full function-table">
                      <div className="card-body p-0">
                            <div className="table-responsive">
                              
                               <RoleListTable/>
                             
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
export default RoleList