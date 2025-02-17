import React from "react";
import { Table, Button } from "react-bootstrap";

const RolesTable = ({ onEdit }) => {
  const dummyRoles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
    { id: 3, name: "Viewer" },
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Role Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dummyRoles.map((role) => (
          <tr key={role.id}>
            <td>{role.id}</td>
            <td>{role.name}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(role)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RolesTable;
