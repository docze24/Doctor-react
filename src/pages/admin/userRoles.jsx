
import React, { useState, useContext, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../contentApi/RoleContext";
import ButtonComp from "../../components/Admin/ButtonComp"; 
import { FiEdit2 } from "react-icons/fi"; //  Import Edit Icon

const UserRoles = () => {
  const { roles = [], hasPermission } = useContext(RoleContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  //  Debugging the permission for Add Role Button
  console.log("Checking add_roles permission:", hasPermission("add_roles"));

  //  Filter roles based on search & status
  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter ? (role.status || "Active") === statusFilter : true)
  );

  useEffect(() => {
    console.log(" Updated Roles List: ", roles);
  }, [roles]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">User Roles</h2>

        {/*  "Add New Role" button properly aligned to the right */}
        {hasPermission("add_roles") ? (
          <Button
            variant="primary"
            size="lg"
            className="fw-semibold px-4"
            onClick={() => navigate("create")}
            style={{ height: "42px", marginLeft: "auto" }} //  Aligns button to the right
          >
            + Add New Role
          </Button>
        ) : (
          <p className="text-danger">❌ No Permission to Add Roles</p>
        )}
      </div>

      {/*  Search and Filter Section */}
      <div className="card p-4 shadow-sm rounded-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <label className="fw-bold">Search By Role Name</label>
            <Form.Control
              type="text"
              placeholder="Search Role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: "14px", height: "42px" }} //  Consistent styling
            />
          </div>
          <div className="col-md-3">
            <label className="fw-bold">Status</label>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ fontSize: "14px", height: "42px" }} //  Consistent styling
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </div>
          <div className="col-md-4 d-flex justify-content-end gap-3">
            <Button
              variant="outline-secondary"
              className="fw-semibold"
              style={{ height: "42px", width: "100px" }}
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
              }}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              className="fw-semibold"
              style={{ height: "42px", width: "100px" }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/*  User Roles Table */}
      <div className="card mt-4 shadow-sm rounded-3">
        <div className="card-body">
          <h6 className="fw-bold">Total Records: {filteredRoles.length}</h6>
          <Table hover responsive className="mt-2">
            <thead className="table-light">
              <tr>
                <th>Role Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role, index) => (
                <tr key={role.id || index}>
                  <td>{role.roleName}</td>
                  <td className="text-center">{role.status || "Active"}</td>
                  <td className="text-center">
                    {/*  Edit Button with Icon */}
                    {hasPermission("edit_roles") && (
                      <Button
                        variant="outline-primary"
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "none"}}
                        onClick={() => navigate(`/admin/user-roles/edit/${role.id}`)}
                      >
                        <FiEdit2 size={18}  /> {/*  Properly Visible Edit Icon */}
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

export default UserRoles;
