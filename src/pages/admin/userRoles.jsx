import React, { useState, useContext, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../contentApi/RoleContext";
import ButtonComp from "../../components/Admin/ButtonComp"; // Imported button component

const UserRoles = () => {
  const { roles = [], addRole } = useContext(RoleContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  //  Fix: Ensure `status` property exists & apply search
  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter ? (role.status || "Active") === statusFilter : true) // Fix applied here
  );

  useEffect(() => {
    console.log(" Updated Roles List: ", roles);
  }, [roles]); //  roles update hone ke baad ye trigger hoga

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">User Roles</h2>

        {/*  Button only visible if user has "add_roles" permission */}
        <ButtonComp
          permission="add_roles"
          label="Add New Role"
          variant="primary"
          icon="add"
          onClick={() => navigate("/admin/user-roles/create")}
        />
        <Button
         variant="primary"
         size="lg"
         className="fw-semibold px-4 mt-4"
         onClick={() => navigate("create")}
        >+ Add New </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="card p-4 shadow-sm rounded-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <label className="fw-bold">Search By Role Name</label>
            <Form.Control
              type="text"
              placeholder="Search Role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="fw-bold">Status</label>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </div>
          <div className="col-md-4 d-flex justify-content-end gap-3">
            <Button variant="outline-secondary" onClick={() => { setSearchTerm(""); setStatusFilter(""); }}>
              Reset
            </Button>
            <Button variant="primary">Search</Button>
          </div>
        </div>
      </div>

      {/* User Roles Table */}
      <div className="card mt-4 shadow-sm rounded-3">
        <div className="card-body">
          <h6 className="fw-bold">Total Records: {filteredRoles.length}</h6>
          <Table bordered hover responsive className="mt-2">
            <thead className="table-light">
              <tr>
                <th>Role Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role,index) => (
                <tr key={role.id || index}>
                  <td>{role.roleName}</td>
                  <td className="text-center">{role.status || "Active"}</td>
                  <td className="text-center">
                    {/*  Edit Button only visible if user has "edit_roles" permission */}
                    <ButtonComp
                      permission="edit_roles"
                      label="Edit"
                      variant="outline-primary"
                      icon="edit"
                      onClick={() => navigate(`/admin/user-roles/edit/${role.id}`)}
                    />
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

export default UserRoles;
