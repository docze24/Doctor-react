import React from 'react'
import PageHeader from '@/components/pageHeader/PageHeader'
import CustomersCreateHeader from '@/components/profile/CustomersCreateHeader'
import CustomerCreateContent from '@/components/profile/CustomerCreateContent'

const ProfileEdit = () => {
    return (
        <>
            <PageHeader>
                <CustomersCreateHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CustomerCreateContent />
                </div>
            </div>
        </>
    )
}

export default ProfileEdit