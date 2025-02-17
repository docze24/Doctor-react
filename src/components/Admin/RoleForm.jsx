import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useRole } from "../../contentApi/RoleContext";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";

const RoleForm = () => {
  const { addRole, editRole, roles = [] } = useRole();
  const navigate = useNavigate();
  const { id, lang } = useParams();
  const isEditing = Boolean(id);

  const [role, setRole] = useState({
    roleName: "",
    permissions: [],
    status: "Active",
  });

  const [expandedSections, setExpandedSections] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  // Sample Permissions Grouped
  const permissionGroups = {
    "CMS": ["Index", "Add", "Edit", "Change Status"],
    "Common Master": ["Index", "Add", "Edit", "Change Status", "Sequence"],
    "Inquiry": ["Index", "Download Csv"],
    "Our Teams": ["Index", "Add", "Edit", "Change Status", "Sequence"]
  };

  // Load Role Data for Editing
  useEffect(() => {
    if (isEditing) {
      const existingRole = roles.find(r => r.id === id);
      if (existingRole) setRole(existingRole);
    }
  }, [id, roles]);

  // Handle Checkbox Change
  const handlePermissionChange = (perm) => {
    setRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  // Handle Select All Permissions
  const handleSelectAll = () => {
    if (!selectAll) {
      const allPermissions = Object.values(permissionGroups).flat();
      setRole((prev) => ({ ...prev, permissions: allPermissions }));
    } else {
      setRole((prev) => ({ ...prev, permissions: [] }));
    }
    setSelectAll(!selectAll);
  };

  // Toggle Expand/Collapse Sections
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editRole(id, role);
    } else {
      addRole(role.roleName, role.permissions);
    }
    navigate(`/${lang}/admin/user-roles`);
  };

  return (
    <div className="container mt-4">
      {/* Header with Back Button */}
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft className="me-2 cursor-pointer" size={18} onClick={() => navigate(`/${lang}/admin/user-roles`)} />
        <h3 className="mb-0">{isEditing ? "Edit User Role" : "Add User Role"}</h3>
      </div>

      <Card className="shadow-sm p-4">
        <Form onSubmit={handleSubmit}>
          {/* Role Name */}
          <Form.Group className="mb-3">
            <Form.Label>Role Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={role.roleName}
              onChange={(e) => setRole({ ...role, roleName: e.target.value })}
              required
            />
          </Form.Group>

          {/* Role Permissions */}
          <h5 className="mt-4">Role Permissions</h5>
          <Form.Check
            type="checkbox"
            label="Select All"
            checked={selectAll}
            onChange={handleSelectAll}
            className="mb-2"
          />

          <Card className="mt-3 shadow-sm">
            <Card.Body>
              {Object.keys(permissionGroups).map((section) => (
                <div key={section} className="mb-3">
                  {/* Section Header */}
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleSection(section)}
                  >
                    <strong>{section}</strong>
                    {expandedSections[section] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                  {/* Permissions List */}
                  {expandedSections[section] && (
                    <Row className="mt-2">
                      {permissionGroups[section].map((perm) => (
                        <Col md={3} key={perm}>
                          <Form.Check
                            type="checkbox"
                            label={perm}
                            checked={role.permissions.includes(perm)}
                            onChange={() => handlePermissionChange(perm)}
                          />
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Status */}
          <Form.Group className="mt-4 mb-3">
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
            <Button variant="secondary" onClick={() => navigate(`/${lang}/admin/user-roles`)} className="me-2">
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
