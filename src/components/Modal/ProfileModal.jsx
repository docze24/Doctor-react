import React, { Fragment, useState } from "react";
import {
  FiBell,
  FiLogOut,
  FiSettings,
  FiUser,
  
} from "react-icons/fi";


const dropdownItems = {
  "Settings": ["Manage Organisation", "Appointment preferences", "Advance options"],
  "Languages": ["English", "French", "Luxembourg"],
  "Notifications": ["View All Notifications", "Set Preferences", "Alerts"],
  "Profile": ["Doctor Profile", "Account Settings", "Switch Clinic"],
};

const ProfileModal = () => {
  // Track which dropdown is currently active
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileHover, setProfileHover] = useState(false);

  // Handle hover events
  const handleMouseEnter = (key) => {
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleProfileHover = () => {
    setProfileHover(true);
  };

  const handleProfileLeave = () => {
    setProfileHover(false);
  };

  return (
    <div
      className={`dropdown nxl-h-item ${profileHover ? "show" : ""}`}
      onMouseEnter={handleProfileHover}
      onMouseLeave={handleProfileLeave}
    >
      <a
        href="#"
        data-bs-toggle="dropdown"
        role="button"
       
      >
        <img
          src="/images/avatar/1.png"
          alt="user-image"
          className="img-fluid user-avtar me-0"
        />
      </a>
      <div
        className={`dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown ${
          profileHover ? "show" : ""
        }`}
      >
        <div className="dropdown-header">
          <div className="d-flex align-items-center">
            <img
              src="/images/avatar/1.png"
              alt="user-image"
              className="img-fluid user-avtar"
            />
            <div>
              <h6 className="text-dark mb-0">
                Alexandra Della
                <span className="badge bg-soft-success text-success ms-1">
                  PRO
                </span>
              </h6>
              <span className="fs-12 fw-medium text-muted">
                alex.della@outlook.com
              </span>
            </div>
          </div>
        </div>

        {/* Generate Dropdowns Dynamically */}
        {Object.entries(dropdownItems).map(([label, items], index) => (
          <Fragment key={index}>
            <div
              className={`dropdown ${activeDropdown === label ? "show" : ""}`}
              onMouseEnter={() => handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#" className="dropdown-item ">
                <span className="hstack">
                  <i className="me-2">{getIcon(label)}</i>
                  <span>{label}</span>
                </span>
              </a>
              <div
                className={`dropdown-menu ${
                  activeDropdown === label ? "show" : ""
                }`}
              >
                {items.map((item, idx) => (
                  <a href="#" className="dropdown-item" key={idx}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
            {index < Object.entries(dropdownItems).length - 1 && (
              <div className="dropdown-divider"></div>
            )}
          </Fragment>
        ))}

        <div className="dropdown-divider"></div>

        {/* Logout */}
        <a href="./auth-login-minimal.html" className="dropdown-item">
          <i>
            <FiLogOut />
          </i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileModal;

const getIcon = (label) => {
  switch (label) {
    case "Settings":
      return <FiSettings />;
    case "Languages":
      return <FiBell />;
    case "Notifications":
      return <FiBell />;
    case "Profile":
      return <FiUser />;
    default:
      return null;
  }
};
