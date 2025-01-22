export const menuList = [
    {
        id: 0,
        title:'OverView',
        name: "dashboards",
        path: "#",
        icon: 'feather-airplay',
        dropdownMenu: [

            {
                id: 1,
                name: "Today's Appointment",
                path: "/dashboards/analytics",
                icon:'analytics',
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Pending Tasks",
                path: "/dashboards/pending-task",
                icon:'task',
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Recent Messages",
                path: "/dashboards/messages",
                icon:'analytics',
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 1,
        name: "appointment",
        path: "#",
        icon: 'feather-cast',
        dropdownMenu: [
            {
                id: 4,
                name: "Calendar",
                path: "/appointment/calendar",
                icon: 'calendar',
                subdropdownMenu: false
            },
            {
                id: 5,
                name: "List View",
                path: "/appointment/appointment-list",
                icon: 'feather-umbrella',
                subdropdownMenu: false
            },
            {
                id: 6,
                name: "Management Actions",
                path: "/appointment/actions",
                icon: 'action',
                subdropdownMenu: false
            },
           
        ]
    },
     {
        id: 2,
        name: "Patients",
        path: '#',
        icon: 'feather-send',
        dropdownMenu: [
            {
                id: 5,
                name: "Patient List",
                path: "/patients/patient-list",
                icon:'feather-compass',
                subdropdownMenu: false
            },
            {
                id: 6,
                name: "Pending Appointment Confirmations",
                path: "/patients/pending-appintment-confirmation",
                icon:'analytics',
                subdropdownMenu: false
            },
            {
                id: 7,
                name: "Upcoming Consultations",
                path: "/patients/upcoming-consultations",
                icon:'analytics',
                subdropdownMenu: false
            },
            {
                id: 8,
                name: "Waiting List",
                path: "/patients/waiting-list",
                icon:'analytics',
                subdropdownMenu: false
            },
            {
                id: 9,
                name: "Medical Record Updates",
                path: "/patients/medical-record-updates",
                icon:'analytics',
                subdropdownMenu: false
            },
            {
                id: 10,
                name: "Post Consultation Follow-ups",
                path: "/patients/consultation-follows-up",
                icon:'analytics',
                subdropdownMenu: false
            },
           
          ]
     },
    {
        id: 3,
        name: "others",
        path: "#",
        icon: 'feather-power',
        dropdownMenu: [
            {
                id: 11,
                name: "Setting",
                path: "/others/setting",
                icon:'setting',
                subdropdownMenu: false
            },
            
           
        ],
    },
   
 ]
