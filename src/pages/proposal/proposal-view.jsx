import React from 'react'
import PageHeader from '@/components/pageHeader/PageHeader'
import ProposalViewHeader from '@/components/proposal/ProposalViewHeader'
import ProposalViewTab from '@/components/proposal/ProposalViewTab'
import ProposalTabContent from '@/components/proposal/ProposalTabContent'
import TasksTabContent from '@/components/proposal/TasksTabContent'
import NotesTabContent from '@/components/proposal/NotesTabContent'
import CommentTabContent from '@/components/proposal/CommentTabContent'
import ProposalSent from '@/components/proposalEditCreate/ProposalSent'

const ProposalView = () => {
    return (
        <>
            <PageHeader>
                <ProposalViewHeader />
            </PageHeader>
            <ProposalViewTab />
            <div className='main-content'>
                <div className='tab-content'>
                    <ProposalTabContent />
                    <TasksTabContent />
                    <NotesTabContent />
                    <CommentTabContent />
                    {/* <ProposalTable /> */}
                </div>
            </div>
            <ProposalSent />
        </>
    )
}

export default ProposalView