import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../contentApi/userContext";
import { RoleContext } from "../contentApi/RoleContext";  

const RequireAuth = ({ requiredPermission ,children }) => {
  const { user, savedUser } = useContext(UserContext);
  const roleContext = useContext(RoleContext);
  const location = useLocation();

  //  Ensure Role Context Exists
  if (!roleContext) {
  //  console.error(" RoleContext is undefined. Ensure RoleProvider is wrapping the App.");
    return <Navigate to="/en/login" replace />;
  }

  const { userRole, hasPermission } = roleContext;

  // Validate if userRole and hasPermission function are defined
  if (!userRole || typeof hasPermission !== "function") {
    //console.error(" Error: Missing role data or hasPermission function.");
    return <Navigate to="/en/login" replace />;
  }

  
  // console.log(` Checking Permission for: ${requiredPermission}`);

  // console.log(" Checking Permission for:", userRole, "Required:", requiredPermission);
  // console.log(" Current Role Permissions:", roleContext ? roleContext.userRole : "No Role Found");
  // console.log(" Does User Have Permission?", hasPermission(requiredPermission));

  //  Check if user is logged in
  if (!user && !savedUser) {
  //  console.log(" User is not logged in. Redirecting to login.");
    return <Navigate to="/en/login" replace state={{ from: location }} />;
  }

  //  Check if user has required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
   // console.error(` Access Denied: User Role "${userRole}" does not have permission - ${requiredPermission}`);
   // console.log(" ERROR: Navigate is being called incorrectly! ");
    return <Navigate to="/en/unauthorized" replace />;
  }

 // console.log(" Access GRANTED ");
  return children ? children : <Outlet />;
};

export default RequireAuth;
