import React, { Fragment, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation, useParams } from "react-router-dom";
import { menuList } from "@/utils/fackData/menuList"; // Import your menu list
import getIcon from "@/utils/getIcon"; // Utility to fetch icons

const Menus = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track parent dropdown
  const [openSubDropdown, setOpenSubDropdown] = useState(null); // Track sub-dropdown
  const [activeParent, setActiveParent] = useState(""); // Active parent
  const [activeChild, setActiveChild] = useState(""); // Active child
  const pathName = useLocation().pathname; // Current path from URL
  const { lang } = useParams(); // Get language (e.g., 'en', 'fr') from URL

  // Handle parent menu toggle
  const handleMainMenu = (e, name) => {
    e.preventDefault(); // Prevent default navigation
    e.stopPropagation(); // Stop event bubbling
    if (openDropdown === name) {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    } else {
      setOpenDropdown(name);
      setOpenSubDropdown(null);
    }
  };

  // Handle sub-menu toggle
  const handleDropdownMenu = (e, name) => {
    e.preventDefault(); // Prevent default navigation
    e.stopPropagation(); // Stop event bubbling
    if (openSubDropdown === name) {
      setOpenSubDropdown(null);
    } else {
      setOpenSubDropdown(name);
    }
  };

  // Update active state based on the URL
  useEffect(() => {
    if (pathName !== "/") {
      const pathParts = pathName.split("/").filter(Boolean); // Split path
      setActiveParent(pathParts[2] || ""); // Update active parent
      setActiveChild(pathParts[3] || ""); // Update active child
      setOpenDropdown(pathParts[2] || ""); // Open dropdown matching URL
      setOpenSubDropdown(pathParts[3] || ""); // Open sub-dropdown matching URL
    } else {
      setActiveParent("");
      setOpenDropdown("");
    }
  }, [pathName]);

  return (
    <ul>
      {menuList.map(({ id, name, path, dropdownMenu, icon }) => (
        <li
          key={id}
          onClick={(e) => handleMainMenu(e, name[lang])} // Toggle parent dropdown
          className={`nxl-item nxl-hasmenu ${
            activeParent === name[lang] ? "active nxl-trigger" : ""
          }`}
        >
          {/* Parent Menu */}
          <a
            href="#"
            className="nxl-link text-capitalize"
            onClick={(e) => handleMainMenu(e, name[lang])}
          >
            <span className="nxl-micon">{getIcon(icon)}</span>
            <span className="nxl-mtext">{name[lang]}</span>
            <span className="nxl-arrow fs-16">
              <FiChevronRight />
            </span>
          </a>
          {/* Dropdown Menu */}
          <ul
            className={`nxl-submenu ${
              openDropdown === name[lang] ? "nxl-menu-visible" : "nxl-menu-hidden"
            }`}
          >
            {dropdownMenu.map(({ id, name, path, subdropdownMenu, icon }) => (
              <Fragment key={id}>
                {subdropdownMenu ? (
                  <li
                    className={`nxl-item nxl-hasmenu ${
                      activeChild === name[lang] ? "active" : ""
                    }`}
                    onClick={(e) => handleDropdownMenu(e, name[lang])} // Toggle sub-dropdown
                  >
                    <a href="#" className="nxl-link text-capitalize">
                      <span className="nxl-micon">{getIcon(icon)}</span>
                      <span className="nxl-mtext">{name[lang]}</span>
                      <span className="nxl-arrow">
                        <FiChevronRight />
                      </span>
                    </a>
                    {/* Sub-dropdown */}
                    <ul
                      className={`nxl-submenu ${
                        openSubDropdown === name[lang]
                          ? "nxl-menu-visible"
                          : "nxl-menu-hidden"
                      }`}
                    >
                      {subdropdownMenu.map(({ id, name, path, icon }) => (
                        <li
                          key={id}
                          className={`nxl-item ${
                            pathName === path.replace(":lang", lang) ? "active" : ""
                          }`}
                        >
                          <Link
                            className="nxl-link text-capitalize"
                            to={path.replace(":lang", lang)}
                          >
                            <span className="nxl-micon">{getIcon(icon)}</span>
                            {name[lang]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  // Direct Dropdown Item
                  <li
                    key={id}
                    className={`nxl-item ${
                      pathName === path.replace(":lang", lang) ? "active" : ""
                    }`}
                  >
                    <Link
                      className="nxl-link text-capitalize"
                      to={path.replace(":lang", lang)}
                    >
                      <span className="nxl-micon">{getIcon(icon)}</span>
                      {name[lang]}
                    </Link>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
