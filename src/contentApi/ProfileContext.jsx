import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name:"Michael Davis",
        avatar: "/images/avatar/1.png",
        followers:"33.8K",
        following:"98.6K",
        engagement:"1M",
        location:"California",
        phone:"+352 48596258",
        firstName: "Michael",
        lastName: "Davis",
        email: "michael.davis@example.com",
        username: "michael123",
        phoneNumber: "+1234567890",
        dateOfBirth: null,
        designation: "Software Engineer",
        website: "https://example.com",
        languages: ["English", "Spanish"],
        
    });

    const [passwordSettings, setPasswordSettings] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoStepAuth: false,
        passwordChangeReminder: false,
    });

    const updateProfile = (updatedFields) => {
        setProfile((prev) => ({ ...prev, ...updatedFields }));
    };

    const updatePasswordSettings = (updatedFields) => {
        setPasswordSettings((prev) => ({ ...prev, ...updatedFields }));
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, passwordSettings, updatePasswordSettings }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
