import React, { createContext, useContext, useState, useEffect } from "react";

//  Create Role Context
export const RoleContext = createContext();

//  Dummy User Roles with Permissions
const rolesData = [
  { roleName: "admin", permissions: ["view_users", "add_users", "edit_users", "delete_users", "view_roles", "view_admin"] },
  { roleName: "editor", permissions: ["view_users", "edit_users"] },
  { roleName: "viewer", permissions: ["view_users"] }
];

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("admin"); // Default role is `admin`
  const [roles, setRoles] = useState(rolesData); // Store roles dynamically

  


  //  Dummy User Data 
  const [users, setUsers] = useState([
    { id: "1", name: "John Doe", username: "johnd", email: "john@example.com", phone: "1234567890", role: "Admin", status: "Active" },
    { id: "2", name: "Jane Smith", username: "janes", email: "jane@example.com", phone: "9876543210", role: "User", status: "Inactive" },
  ]);

  useEffect(() => {
    console.log(" Current User Role:", userRole);
    // Log current permissions for the userRole
    const currentRole = roles.find(role => role.roleName === userRole);
    if (currentRole) {
      console.log(" Permissions for this Role:", currentRole.permissions);
    }
  }, [userRole, roles]);

  //  Check if user has permission
  const hasPermission = (permission) => {
    const currentRole = roles.find(role => role.roleName === userRole);
    return currentRole ? currentRole.permissions.includes(permission) : false;
  };

  //  **Function to Get User by ID**
  const getUserById = (id) => users.find((user) => user.id === id);

  //  **Function to Add User**
  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: String(users.length + 1) }]);
  };

  //  **Function to Edit User**
  const editUser = (id, updatedUser) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  //  **Function to Add Role**
  const addRole = (roleName, permissions, status = "Inactive") => {
    setRoles((prevRoles) => {
      console.log(" Previous Roles List: ", prevRoles);
  
      // Ensure role is unique
      if (prevRoles.some(role => role.roleName === roleName)) {
        console.log(" Role already exists!");
        return prevRoles;
      }
  
      // Add new role with default status "Inactive" if not provided
      const newRole = {
        id: `${Date.now()}`,  // Unique ID
        roleName,
        permissions,
        status: status || "Inactive",
      };
  
      const updatedRoles = [...prevRoles, newRole];
      console.log(" Updated Roles List After Add: ", updatedRoles);
      return updatedRoles;
    });
  };
  


  // **Function to Edit Role Permissions**
  const editRole = (id, updatedRole) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === id ? { ...role, ...updatedRole } : role
      )
    );
    console.log(` Role Updated: ${updatedRole.roleName}`, updatedRole);
  };
  

  return (
    <RoleContext.Provider value={{ userRole, setUserRole, hasPermission,roles, users, getUserById, addUser, editUser,addRole,editRole }}>
      {children}
    </RoleContext.Provider>
  );
};

//  Custom Hook to use Role Context
export const useRole = () => {
  return useContext(RoleContext);
};
