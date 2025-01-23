import React from 'react'
import Header from '@/components/shared/header/Header'
import NavigationManu from '@/components/shared/navigationMenu/NavigationMenu'
import { Outlet, useLocation } from 'react-router-dom'
import useBootstrapUtils from '@/hooks/useBootstrapUtils'

const ProfileLayout = () => {
    const pathName = useLocation().pathname
     useBootstrapUtils(pathName)

    const getClassName = (pathName) => {
        switch (pathName) {
            case "/settings/organisation":
                return "manage-organisation"
            case "/profile/overview":
                return "apps-calendar"

            default:
                return null
        }
    }
    return (
        <>
            <Header />
            <NavigationManu />
            <main className={`nxl-container apps-container ${getClassName(pathName)}`}>
                <div className="nxl-content without-header nxl-full-content">
                    <div className='main-content d-flex'>
                        <Outlet />
                    </div>
                </div>
            </main>
            
        </>
    )
}

export default ProfileLayout;