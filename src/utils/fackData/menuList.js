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
                path: "/dashboards",
                icon:'analytics',
                subdropdownMenu: false
            },
           
        ]
    },
    {
        id: 1,
        name: "appointment",
        path: "#",
        icon: 'feather-cast',
        dropdownMenu: [
            {
                id: 2,
                name: "Calendar",
                path: "/appointment/calendar",
                icon: 'calendar',
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
                id: 3,
                name: "Patient List",
                path: "/patients/patient-list",
                icon:'feather-compass',
                subdropdownMenu: false
            },
            {
                id: 4,
                name: " Create Patient",
                path: "/patients/patient-create",
                icon:'analytics',
                subdropdownMenu: false
            },
            
           
          ]
     },
    {
        id: 3,
        name: "Proposals",
        path: "#",
        icon: 'feather-layout',
        dropdownMenu: [
            {
                id: 5,
                name: "Proposal List",
                path: "/proposal/proposal-list",
                icon:'feather-activity',
                subdropdownMenu: false
            },
            {
                id: 6,
                name: "Proposal View",
                path: "/proposal/proposal-view",
                icon:'feather-tablet',
                subdropdownMenu: false
            },
            
            {
                id: 7,
                name: "Proposal Create",
                path: "/proposal/proposal-create",
                icon:'feather-tablet',
                subdropdownMenu: false
            },
            
           
        ],
    },
    {
        id: 4,
        name: "Application",
        path: "#",
        icon: 'feather-message-square',
        dropdownMenu: [
            {
                id: 7,
                name: "Messages",
                path: "/application/message",
                icon:'setting',
                subdropdownMenu: false
            },
            {
                id: 8,
                name: "Chat",
                path: "/application/chat",
                icon:'feather-send',
                subdropdownMenu: false
            },
            
            
           
        ],
    },
   
 ]
