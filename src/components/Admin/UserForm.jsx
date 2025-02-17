import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useRole } from "../../contentApi/RoleContext";

const UserFormPage = () => {
  const { id, lang } = useParams();
  const navigate = useNavigate();
  const { addUser, editUser,roles=[], getUserById ,users} = useRole();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    status: "Active",
  });

  //  Load user data in edit mode
  useEffect(() => {
    if (id) {
      const existingUser = getUserById(id);
      if (existingUser) {
        setUser(existingUser);
      }
    }
  }, [id,users]);

  //  Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editUser(id, user);
    } else {
      addUser(user);
    }
    navigate(`/${lang}/admin/users`);
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold">{id ? "Edit User" : "Add User"}</h2>

      <Card className="p-4 shadow-sm rounded-3">
        <Form onSubmit={handleSubmit} className="row g-3">
          {/*  Role */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fw-bold">Role *</Form.Label>
              <Form.Select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          {/*  Name */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fw-bold">Name *</Form.Label>
              <Form.Control
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </Form.Group>
          </div>

          {/*  Email */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fw-bold">Email *</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </Form.Group>
          </div>

          {/*  Phone */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fw-bold">Phone *</Form.Label>
              <Form.Control
                type="text"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                required
              />
            </Form.Group>
          </div>

          {/*  Password */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fw-bold">Password *</Form.Label>
              <Form.Control
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </Form.Group>
          </div>

          {/*  Confirm Password */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fw-bold">Confirm Password *</Form.Label>
              <Form.Control
                type="password"
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                required
              />
            </Form.Group>
          </div>

          {/*  Status */}
          <div className="col-md-6">
            <Form.Group>
              <Form.Label className="fw-bold">Status</Form.Label>
              <Form.Select
                value={user.status}
                onChange={(e) => setUser({ ...user, status: e.target.value })}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </div>

          {/*  Buttons */}
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="secondary"
              onClick={() => navigate(`/${lang}/admin/users`)}
              className="me-2"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {id ? "Update User" : "Add User"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default UserFormPage;
