import React, { useState } from "react";
import { FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const dropdownItems = {
  "Profile": "/profile/overview",
  "Account Settings": "/profile/edit",
  
};

const ProfileModal = () => {
  const [profileHover, setProfileHover] = useState(false);
  const navigate = useNavigate();

  // Handle profile hover
  const handleProfileHover = () => setProfileHover(true);
  const handleProfileLeave = () => setProfileHover(false);

  // Handle navigation
  const handleItemClick = (route) => {
    navigate(route); // Navigate to the specified route
  };

  const handleLogout = () => {
    // Perform logout logic (like clearing tokens, etc.)
    navigate("/login"); // Navigate to the /login route
  };

  return (
    <div
      className={`dropdown nxl-h-item ${profileHover ? "show" : ""}`}
      onMouseEnter={handleProfileHover}
      onMouseLeave={handleProfileLeave}
    >
      <a href="#" role="button">
        <img
          src="/images/avatar/1.png"
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
              src="/images/avatar/1.png"
              alt="user-avatar"
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

        {/* Render Dropdown Items Dynamically */}
        {Object.entries(dropdownItems).map(([label, route], index) => (
          <div className="dropdown" key={index}>
            <a
            
              className="dropdown-item"
              role="button" 
              onClick={() => handleItemClick(route)}
            >
              <span className="hstack">
                <i className="me-2">
                  {label === "Profile" ? <FiUser /> : <FiSettings />}
                </i>
                <span>{label}</span>
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
          <span>Logout</span>
        </div>

      </div>
    </div>
  );
};

export default ProfileModal;
