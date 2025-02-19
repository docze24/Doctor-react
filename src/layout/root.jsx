import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavigationManu from "@/components/navigationMenu/NavigationMenu";
import Header from "@/components/header/Header";
import useBootstrapUtils from "@/hooks/useBootstrapUtils";
import SupportDetails from "@/components/supportDetails";
import { LanguageProvider } from "../contentApi/LanguageContext";
import { roleApi } from "../api";

const RootLayout = () => {
  const pathName = useLocation().pathname;
  useBootstrapUtils(pathName);

  const groupMenu = [
    { name: "User Management", icon: "feather-airplay", submenu: ["users", "user_role"] },
  ];

  // Function to convert menuList1 into grouped and individual menu
  const convertMenu = (menuList, groupList) => {
    let groupedMenus = [];

    // Process groups
    groupList.forEach((group, index) => {
      const submenuItems = menuList.filter(item => group.submenu.includes(item.module_name));

      if (submenuItems.length) {
        groupedMenus.push({
          id: `group_${index + 1}`,
          module_name: group.name,
          module_label: group.name,
          icon: group.icon,
          submenu: submenuItems,
        });
      }
    });

    // Find individual (non-grouped) menu items
    const groupedModuleNames = groupList.flatMap(group => group.submenu);
    const individualMenus = menuList.filter(item => !groupedModuleNames.includes(item.module_name));

    return [...groupedMenus, ...individualMenus];
  };

  useEffect(() => {
    const fetchLeftMenu = async () => {
      
        try {
          const response = await roleApi.leftMenu();
          if (response?.data?.status === 200) {
            const menuRes = response?.data?.data;
            const filter_menuList1 = convertMenu(menuRes, groupMenu);
            console.log("Filtered Menu:", filter_menuList1);
            localStorage.setItem("LeftMenuList", JSON.stringify(filter_menuList1))
          } else {
            topTost(response?.data?.message, "error");
          }
        } catch (err) {
          console.log("Login error:", err);
        }
      
    };

    fetchLeftMenu();
  }, []); // ✅ Correct dependency array

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
  );
};

export default RootLayout;
