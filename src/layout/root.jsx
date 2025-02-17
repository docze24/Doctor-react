import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavigationManu from '@/components/navigationMenu/NavigationMenu'
import Header from '@/components/header/Header'
import useBootstrapUtils from '@/hooks/useBootstrapUtils'
import SupportDetails from '@/components/supportDetails'
import { LanguageProvider } from '../contentApi/LanguageContext'
const RootLayout = () => {
    const pathName = useLocation().pathname
    useBootstrapUtils(pathName)
    return (
        <LanguageProvider>
            <Header />
            <NavigationManu />
            <main className="nxl-container">
                <div className="nxl-content">
                    <Outlet />
                </div>
            </main>
            <SupportDetails />
         </LanguageProvider>
    )
}

export default RootLayout