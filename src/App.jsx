import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/router';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import NavigationProvider from './contentApi/navigationProvider';
import SideBarToggleProvider from './contentApi/sideBarToggleProvider';
import { UserProvider } from './contentApi/userContext';
import ThemeCustomizer from './components/shared/ThemeCustomizer';
import { ProfileProvider } from './contentApi/ProfileContext';
import { LanguageProvider } from './contentApi/LanguageContext'; 
import { RoleProvider } from './contentApi/RoleContext';

const App = () => {
  console.log("AAAAAAAAAAAA");
  return (
    <I18nextProvider i18n={i18n}>
      <RoleProvider>
      <UserProvider>
        <ProfileProvider>
          <NavigationProvider>
            <SideBarToggleProvider>
              <RouterProvider router={router}>  
                <LanguageProvider/>
              </RouterProvider>
            </SideBarToggleProvider>
          </NavigationProvider>
        </ProfileProvider>
      </UserProvider>
      </RoleProvider>
      <ThemeCustomizer />
    </I18nextProvider>
  );
};

export default App;

