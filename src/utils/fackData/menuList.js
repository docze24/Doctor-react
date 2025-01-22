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
                id: 4,
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
                id: 5,
                name: "Patient List",
                path: "/patients/patient-list",
                icon:'feather-compass',
                subdropdownMenu: false
            },
            {
                id: 6,
                name: " Create Patient",
                path: "/patients/patient-create",
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
