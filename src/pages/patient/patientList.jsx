import React from 'react'
import PatientHeader from '@/components/pageHeader/PatientHeader'
import PatientSearchHeader from '@/components/patient/PatientSearchHeader'
import PatientList from '@/components/patient/patientList'
import Footer from '@/components/shared/Footer'

const LeadsList = () => {
    return (
        <>
            <PatientHeader>
                 <PatientSearchHeader />
            </PatientHeader> 
            <div className='main-content'>
                <div className='row'>
                    <PatientList/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LeadsList