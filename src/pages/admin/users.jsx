import React, { useContext, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../contentApi/RoleContext";
import { FiEdit2 } from "react-icons/fi"; // Edit Icon

const Users = () => {
  const { hasPermission, users } = useContext(RoleContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  //  Filter Users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-xxl mt-4">
      {/*  Title & Add New Button Aligned in the Same Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className=" mb-0 ">User Management</h2>
        {hasPermission("add_users") && (
          <Button
            variant="primary"
            size="lg"
            className="fw-semibold px-4 mt-4"
            onClick={() => navigate("create")}
          >
            + Add New
          </Button>
        )}
      </div>

      {/*  Search & Filters Section */}
      <div className="card p-4 shadow-sm rounded-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-8">
            <label className="fw-bold">Search By Username/Email</label>
            <Form.Control
              type="text"
              placeholder="Search by email or username"
              className="form-control shadow-none"
              style={{ color: "#6c757d", fontSize: "14px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="fw-bold">Select Role</label>
            <Form.Select className="shadow-none" style={{ fontSize: "14px" }}>
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </div>
          <div className="col-md-2">
            <label className="fw-bold">Status</label>
            <Form.Select className="shadow-none" style={{ fontSize: "14px" }}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </div>
        </div>
      </div>

      {/*  Users Table */}
      <div className="card mt-4 shadow-sm rounded-3">
        <div className="card-body">
          <h6 className="fw-bold">Total Users: {filteredUsers.length}</h6>
          <Table striped bordered hover className="mt-2 align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`badge ${user.status === "Active" ? "bg-success" : "bg-danger"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {hasPermission("edit_users") && (
                      <Button
                        variant="outline-dark"
                        size="sm"
                        className="fw-semibold "
                        onClick={() => navigate(`edit/${user.id}`)}
                      >
                        <FiEdit2/>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;