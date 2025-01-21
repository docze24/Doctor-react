import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import Home from "../pages/home";
 import Analytics from "../pages/analytics";
// import ReportsSales from "../pages/reports-sales";
// import ReportsLeads from "../pages/reports-leads";
// import ReportsProject from "../pages/reports-project";
  import AppsChat from "../pages/apps-chat";
  import LayoutPatient from '../layout/layoutPatient';
 // import LayoutApplications from "../layout/layoutPatient";
// import AppsEmail from "../pages/apps-email";
// import ReportsTimesheets from "../pages/reports-timesheets";
// import LoginCover from "../pages/login-cover";
 //import AppsTasks from "../pages/apps-tasks";
// import AppsNotes from "../pages/apps-notes";
 import AppsCalender from "../pages/apps-calender";
// import AppsStorage from "../pages/apps-storage";
// import Proposalist from "../pages/proposal-list";
// import CustomersList from "../pages/customers-list";
// import ProposalView from "../pages/proposal-view";
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
 import SettingsGaneral from "../pages/settings-ganeral";
 import LayoutSetting from "../layout/layoutSetting";
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
 import LayoutAuth from "../layout/layoutAuth";

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
import LayoutAppointment from "../layout/layoutappointment";
// import AppsCalender from "../pages/AppCalendar";

//import ProfileModal from "@/components/shared/header/ProfileModal";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [  
             {     
                   path: "/",    
                   element: <Home />  },
             {     
                   path: "/dashboards/analytics", 
                   element: <Analytics />
             },
           

        ]
    },
    {
        path: "/",
        element: <LayoutPatient />,
        children: [
            {
                path: "/patients/patient-list",
                element: <AppsChat />
            },
          
        ]
    },
    {
        path: "/",
        element: <LayoutSetting />,
        children: [
            {
                path: "/settings/ganeral",
                element: <SettingsGaneral />
            },
            // {
            //     path: "/settings/seo",
            //     element: <SettingsSeo />
            // },
            // {
            //     path: "/settings/tags",
            //     element: <SettingsTags />
            // },
            // {
            //     path: "/settings/email",
            //     element: <SettingsEmail />
            // },
            // {
            //     path: "/settings/tasks",
            //     element: <SettingsTasks />
            // },
            // {
            //     path: "/settings/leads",
            //     element: <SettingsLeads />
            // },
            // {
            //     path: "/settings/Support",
            //     element: <SettingsSupport />
            // },
            // {
            //     path: "/settings/finance",
            //     element: <SettingsFinance />
            // },
            // {
            //     path: "/settings/gateways",
            //     element: <SettingsGateways />
            // },
            // {
            //     path: "/settings/customers",
            //     element: <SettingsCustomers />
            // },
            // {
            //     path: "/settings/localization",
            //     element: <SettingsLocalization />
            // },
            // {
            //     path: "/settings/recaptcha",
            //     element: <SettingsRecaptcha />
            // },
            // {
            //     path: "/settings/miscellaneous",
            //     element: <SettingsMiscellaneous />
            // },
        ]
    },
    {
        path: "/",
        element: <LayoutAuth />,
        children: [
            // {
            //     path: "/authentication/login/cover",
            //     element: <LoginCover />
            // },
            // {
            //     path: "/authentication/login/minimal",
            //     element: <LoginMinimal />
            // },
            // {
            //     path: "/authentication/login/creative",
            //     element: <LoginCreative />
            // },
            // {
            //     path: "/authentication/register/cover",
            //     element: <RegisterCover />
            // },
            // {
            //     path: "/authentication/register/minimal",
            //     element: <RegisterMinimal />
            // },
            // {
            //     path: "/authentication/register/creative",
            //     element: <RegisterCreative />
            // },
            // {
            //     path: "/authentication/reset/cover",
            //     element: <ResetCover />
            // },
            // {
            //     path: "/authentication/reset/minimal",
            //     element: <ResetMinimal />
            // },
            // {
            //     path: "/authentication/reset/creative",
            //     element: <ResetCreative />
            // },
            // {
            //     path: "/authentication/404/cover",
            //     element: <ErrorCover />
            // },
            // {
            //     path: "/authentication/404/minimal",
            //     element: <ErrorMinimal />
            // },
            // {
            //     path: "/authentication/404/creative",
            //     element: <ErrorCreative />
            // },
            // {
            //     path: "/authentication/verify/cover",
            //     element: <OtpCover />
            // },
            // {
            //     path: "/authentication/verify/minimal",
            //     element: <OtpMinimal />
            // },
            // {
            //     path: "/authentication/verify/creative",
            //     element: <OtpCreative />
            // },
            // {
            //     path: "/authentication/maintenance/cover",
            //     element: <MaintenanceCover />
            // },
            // {
            //     path: "/authentication/maintenance/minimal",
            //     element: <MaintenanceMinimal />
            // },
            // {
            //     path: "/authentication/maintenance/creative",
            //     element: <MaintenanceCreative />
            // },
        ]
    },
    {
        path: "/",
        element: <LayoutAppointment />,  // Layout for appointment-related pages
        children: [
            {
                path: "/appointment/calendar", 
                 element: <AppsCalender/>  
            },
            {
                path: "/appointment/appointment-list", 
                 element: <AppsChat/>  
            },
            
        ]
    },
    // {
    //     path:"/",
    //     element:<ProfileModal/>,
    //     children:[
    //         {
    //             path: "/settings/organisation", 
    //              element: <AppsCalender/>  
    //         },

    //     ]
    // }


])