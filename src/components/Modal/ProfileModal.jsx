import React, { useState, useContext } from "react";
import { UserContext } from "../../contentApi/userContext";
import { FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const dropdownItems = {
  profile: "/profile/overview",
  accountSettings: "/profile/edit",
};

const ProfileModal = () => {
  const { user, logout } = useContext(UserContext);
  const [profileHover, setProfileHover] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(["input"]);

  // Handle profile hover
  const handleProfileHover = () => setProfileHover(true);
  const handleProfileLeave = () => setProfileHover(false);

  // Handle navigation
  const handleItemClick = (route) => {
    navigate(route); // Navigate to the specified route
  };

  const handleLogout = () => {
    logout();
    navigate("/en/login"); 
  };

  return (
    <div
      className={`dropdown nxl-h-item ${profileHover ? "show" : ""}`}
      onMouseEnter={handleProfileHover}
      onMouseLeave={handleProfileLeave}
    >
      <a href="#" role="button">
        <img
          src="/images/avatar/pro.png"
          alt="user-avatar"
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
              src="/images/avatar/pro.png"
              alt="user-avatar"
              className="img-fluid user-avtar"
            />
            <div>
              <h6 className="text-dark mb-0">
                {t("userName", { ns: "input" })} {/* User name */}
                <span className="badge bg-soft-success text-success ms-1"></span>
              </h6>
              <span className="fs-12 fw-medium text-muted">
                {t("userRole", { ns: "input" })} {/* User role */}
              </span>
            </div>
          </div>
        </div>

        {/* Render Dropdown Items Dynamically */}
        {Object.entries(dropdownItems).map(([key, route], index) => (
          <div className="dropdown" key={index}>
            <a
              className="dropdown-item"
              role="button"
              onClick={() => handleItemClick(route)}
            >
              <span className="hstack">
                <i className="me-2">
                  {key === "profile" ? <FiUser /> : <FiSettings />}
                </i>
                <span>{t(key, { ns: "input" })}</span>
              </span>
            </a>
          </div>
        ))}

        <div className="dropdown-divider"></div>

        <div
          className="dropdown-item"
          role="button"
          onClick={handleLogout} // Trigger logout function
        >
          <i>
            <FiLogOut />
          </i>
          <span>{t("logout", { ns: "input" })}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
