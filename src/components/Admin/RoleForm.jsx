import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useRole } from "../../contentApi/RoleContext";

const RoleForm = () => {
  const { addRole, editRole, getRoleById, roles=[] } = useRole(); //  Use RoleContext
  const navigate = useNavigate();
  const { id } = useParams(); //  Get role ID from URL for edit
  const isEditing = Boolean(id); //  Check if editing
  const {lang} = useParams();

  const [role, setRole] = useState({
    roleName: "",
    permissions: [],
    status: "Active",
  });

  //  Load Role Data for Editing
  useEffect(() => {
    if (isEditing) {
      const existingRole = getRoleById(id);
      if (existingRole) {
        setRole(existingRole);
      }
    }
  }, [id, roles]);

  //  Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Role Data to Submit: ", role);

    if (isEditing) {
      editRole(id, role); // Update existing role
    } else {
      addRole(role.roleName,role.permissions); // Add new role
    }

    navigate(`/${lang}/admin/user-roles`); //  Redirect after save
  };

  return (
    <div className="container mt-4">
      <Card className="shadow-sm p-4">
        <h3 className="mb-4">{isEditing ? "Edit User Role" : "Add User Role"}</h3>

        <Form onSubmit={handleSubmit}>
          {/* Role Name */}
          <Form.Group className="mb-3">
            <Form.Label>Role Name *</Form.Label>
            <Form.Control
              type="text"
              value={role.roleName}
              onChange={(e) => setRole({ ...role, roleName: e.target.value })}
              required
            />
          </Form.Group>

          {/* Role Permissions */}
          <h5>Role Permissions</h5>
          <Row className="mb-3">
            {["view_users", "add_users", "edit_users", "delete_users", "view_roles"].map((perm) => (
              <Col md={3} key={perm}>
                <Form.Check
                  type="checkbox"
                  label={perm.replace("_", " ")}
                  checked={role.permissions.includes(perm)}
                  onChange={(e) => {
                    setRole((prev) => ({
                      ...prev,
                      permissions: e.target.checked
                        ? [...prev.permissions, perm]
                        : prev.permissions.filter((p) => p !== perm),
                    }));
                  }}
                />
              </Col>
            ))}
          </Row>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={role.status}
              onChange={(e) => setRole({ ...role, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => navigate("/admin/user-roles")} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? "Update Role" : "Save Role"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RoleForm;
