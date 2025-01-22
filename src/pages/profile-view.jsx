import React from 'react'
import PageHeader from '@/components/pageHeader/PageHeader'
import CustomersViewHeader from '@/components/profile/profileViewHeader'
import CustomerContent from '@/components/profile/profileContent'

const ProfileView = () => {
    return (
        <>
            <PageHeader>
                <CustomersViewHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CustomerContent/>
                </div>
            </div>
        </>
    )
}

export default ProfileView