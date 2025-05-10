import React from 'react'
import PageHeader from '@/components/pageHeader/PageHeader'
import ProposalEditHeader from '@/components/proposal/ProposalEditHeader'
import ProposalCreateContent from '@/components/proposal/ProposalCreateContent'
import ProposalSent from '@/components/proposal/ProposalSent'

const ProposalCreate = () => {
    return (
        <>
            <PageHeader>
                <ProposalEditHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    {/* <ProposalTable /> */}
                    <ProposalCreateContent />
                  
                </div>
            </div>
            <ProposalSent />
        </>
    )
}

export default ProposalCreate