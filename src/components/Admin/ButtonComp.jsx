import React from "react";
import { Button } from "react-bootstrap";
import { useRole } from "../../contentApi/RoleContext";
import { FiEdit, FiTrash2, FiPlus, FiEye } from "react-icons/fi"; //  Feather Icons

const ButtonComp = ({ permission, label, onClick, variant = "primary", icon }) => {
  const { hasPermission } = useRole();

  if (!hasPermission(permission)) return null; //  Hide button if no permission

  //  Mapping icons dynamically
  const icons = {
    edit: <FiEdit size={16} />,
    delete: <FiTrash2 size={16} />,
    add: <FiPlus size={16} />,
    view: <FiEye size={16} />,
  };

  return (
    <Button variant={variant} onClick={onClick} className="m-1 d-flex align-items-center gap-2">
      {icon && icons[icon]} {label}
    </Button>
  );
};

export default ButtonComp;
