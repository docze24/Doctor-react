export const menuList = [
    {
      id: 0,
      title: {
        en: "Overview",
        fr: "Aperçu"
      },
      name: {
        en: "dashboards",
        fr: "tableaux"
      },
      path: "/:lang/dashboards",
      icon: "feather-airplay",
      dropdownMenu: [
        {
          id: 1,
          name: {
            en: "Today's Appointment",
            fr: "Rendez-vous d'aujourd'hui"
          },
          path: "/:lang/dashboards",
          icon: "analytics",
          subdropdownMenu: false
        }
      ]
    },
    {
      id: 1,
      name: {
        en: "Appointment",
        fr: "Rendez-vous"
      },
      path: "/:lang/appointment",
      icon: "feather-cast",
      dropdownMenu: [
        {
          id: 2,
          name: {
            en: "Calendar",
            fr: "Calendrier"
          },
          path: "/:lang/appointment/calendar",
          icon: "calendar",
          subdropdownMenu: false
        }
      ]
    },
    {
      id: 2,
      name: {
        en: "Patients",
        fr: "Patients"
      },
      path: "/:lang/patients",
      icon: "feather-send",
      dropdownMenu: [
        {
          id: 3,
          name: {
            en: "Patient List",
            fr: "Liste des patients"
          },
          path: "/:lang/patients/patient-list",
          icon: "feather-compass",
          subdropdownMenu: false
        },
        {
          id: 4,
          name: {
            en: "Create Patient",
            fr: "Créer un patient"
          },
          path: "/:lang/patients/patient-create",
          icon: "analytics",
          subdropdownMenu: false
        }
      ]
    },
    {
      id: 3,
      name: {
        en: "Proposals",
        fr: "Propositions"
      },
      path: "/:lang/proposal",
      icon: "feather-layout",
      dropdownMenu: [
        {
          id: 5,
          name: {
            en: "Proposal List",
            fr: "Liste des propositions"
          },
          path: "/:lang/proposal/proposal-list",
          icon: "feather-activity",
          subdropdownMenu: false
        },
        {
          id: 6,
          name: {
            en: "Proposal View",
            fr: "Vue de la proposition"
          },
          path: "/:lang/proposal/proposal-view",
          icon: "feather-tablet",
          subdropdownMenu: false
        },
        {
          id: 7,
          name: {
            en: "Proposal Create",
            fr: "Créer une proposition"
          },
          path: "/:lang/proposal/proposal-create",
          icon: "feather-tablet",
          subdropdownMenu: false
        }
      ]
    },
    {
      id: 4,
      name: {
        en: "Application",
        fr: "Application"
      },
      path: "/:lang/application",
      icon: "feather-message-square",
      dropdownMenu: [
        {
          id: 7,
          name: {
            en: "Messages",
            fr: "Messages"
          },
          path: "/:lang/application/message",
          icon: "setting",
          subdropdownMenu: false
        },
        {
          id: 8,
          name: {
            en: "Chat",
            fr: "Discussion"
          },
          path: "/:lang/application/chat",
          icon: "feather-send",
          subdropdownMenu: false
        }
      ]
    }
  ];
  