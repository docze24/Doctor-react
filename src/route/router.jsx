import { createBrowserRouter } from "react-router-dom";

// import ReportsSales from "../pages/reports-sales";
// import ReportsLeads from "../pages/reports-leads";
// import ReportsProject from "../pages/reports-project";
//  import LayoutPatient from '../layout/layoutPatient';
// import AppsEmail from "../pages/apps-email";
// import ReportsTimesheets from "../pages/reports-timesheets";
// import LoginCover from "../pages/login-cover";
//import AppsTasks from "../pages/apps-tasks";
// import AppsNotes from "../pages/apps-notes";
//import AppsCalender from "../pages/apps-calender";
// import AppsStorage from "../pages/apps-storage";
// import Proposalist from "../pages/proposal-list";
// import CustomersList from "../pages/customers-list";
//import ProposalView from "../pages/proposal-view";
// import ProposalEdit from "../pages/proposal-edit";
// import LeadsList from "../pages/leadsList";
// import CustomersView from "../pages/customers-view";
// import CustomersCreate from "../pages/customers-create";
// import ProposalCreate from "../pages/proposal-create";
// import LeadsView from "../pages/leads-view";
// import LeadsCreate from "../pages/leads-create";
// import PaymentList from "../pages/payment-list";
// import PaymentView from "../pages/payment-view/";
// import PaymentCreate from "../pages/payment-create";
// import ProjectsList from "../pages/projects-list";
// import ProjectsView from "../pages/projects-view";
// import ProjectsCreate from "../pages/projects-create";
// import SettingsGaneral from "../pages/settings-ganeral";
// import LayoutSetting from "../layout/layoutSetting";
// import SettingsSeo from "../pages/settings-seo";
// import SettingsTags from "../pages/settings-tags";
// import SettingsEmail from "../pages/settings-email";
// import SettingsTasks from "../pages/settings-tasks";
// import SettingsLeads from "../pages/settings-leads";
// import SettingsMiscellaneous from "../pages/settings-miscellaneous";
// import SettingsRecaptcha from "../pages/settings-recaptcha";
// import SettingsLocalization from "../pages/settings-localization";
// import SettingsCustomers from "../pages/settings-customers";
// import SettingsGateways from "../pages/settings-gateways";
// import SettingsFinance from "../pages/settings-finance";
// import SettingsSupport from "../pages/settings-support";
// import LayoutAuth from "../layout/layoutAuth";

// import LoginMinimal from "../pages/login-minimal";

// import LoginCreative from "../pages/login-creative";
// import RegisterCover from "../pages/register-cover";
// import RegisterMinimal from "../pages/register-minimal";
// import RegisterCreative from "../pages/register-creative";
// import ResetCover from "../pages/reset-cover";
// import ResetMinimal from "../pages/reset-minimal";
// import ResetCreative from "../pages/reset-creative";
// import ErrorCover from "../pages/error-cover";
// import ErrorCreative from "../pages/error-creative";
// import ErrorMinimal from "../pages/error-minimal";
// import OtpCover from "../pages/otp-cover";
// import OtpMinimal from "../pages/otp-minimal";
// import OtpCreative from "../pages/otp-creative";
// import MaintenanceCover from "../pages/maintenance-cover";
// import MaintenanceMinimal from "../pages/maintenance-minimal";
// import MaintenanceCreative from "../pages/maintenance-creative";
// import HelpKnowledgebase from "../pages/help-knowledgebase";
// import WidgetsLists from "../pages/widgets-lists";
// import WidgetsTables from "../pages/widgets-tables";
// import WidgetsCharts from "../pages/widgets-charts";
// import WidgetsStatistics from "../pages/widgets-statistics";
// import WidgetsMiscellaneous from "../pages/widgets-miscellaneous";
//import LayoutAppointment from "../layout/layoutappointment";
// import AppsCalender from "../pages/AppCalendar";

/******************AUTH ALYOUT************************** */
/*########################################################*/
import LayoutAuth from "../layout/layoutAuth";
import Login from "../pages/authentication/login";
import Signup from "../pages/authentication/signup";
import Forgotpassword from "../pages/authentication/forgotpassword";

/******************ROOT ALYOUT************************** */
/*########################################################*/
import RootLayout from "../layout/root";
import Home from "../pages/home";
import Analytics from "../pages/analytics";


import PatientList from "../pages/patient/patientList";
//import PatientCreate from "../pages/patient/patientCreate";
//import patientView from "../pages/patient/patientView";


import Proposalist from "../pages/proposal/proposal-list";
import ProposalView from "../pages/proposal/proposal-view";
import ProposalCreate from "../pages/proposal/proposal-create";
// import ProposalEdit from "../pages/proposal/proposal-edit";


//import LeadsList from "../pages/leadsList";
//import CustomersList from "../pages/customers-list";
import ProfileView from "../pages/profile-view";
import ProfileEdit from "../pages/profile-edit";


/******************ROOT APPLICATION************************** */
/*########################################################*/

import LayoutApplication from "../layout/layoutApplication";
import AppsChat from "../pages/apps-chat";

// Require auth
import RequireAuth from "../contentApi/RequireAuth";



export const router = createBrowserRouter([

    {
        path: "/",
        element: <LayoutAuth />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { path: "/forgot-password", element: <Forgotpassword /> },

        ]
    },

    {
        path: '/',
        element: <RequireAuth />,
        children: [
            {
                path: "/",
                element: <RootLayout />,
                children: [
                    //{ path: "/",    element: <Home />  },
                    { path: "/dashboards", element: <Analytics /> },
                    { path: "/patients/patient-list", element: <PatientList /> },
                    //  { path: "/patients/patient-create",element:<PatientCreate/>},


                    { path: "/profile/overview", element: <ProfileView /> },
                    { path: "/profile/edit", element: <ProfileEdit /> },

                    { path: "/proposal/proposal-list", element: <Proposalist /> },
                    { path: "/proposal/proposal-create", element: <ProposalCreate /> },
                    { path: "/proposal/proposal-view", element: <ProposalView /> },
                    //  { path: "/proposal/edit", element: <ProposalEdit/> },

                ]
            }
        ],
    },


    {
        path: "/",
        element: <LayoutApplication />,
        children: [
            {
                path: "/application/chat",
                element: <AppsChat />
            },
        ]
    },


])