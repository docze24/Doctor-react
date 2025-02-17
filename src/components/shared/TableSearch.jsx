import React, { useContext } from 'react';
import { LanguageContext } from '../../contentApi/LanguageContext';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

const TableSearch = ({ setGlobalFilter, globalFilter }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div >
      <Row className="align-items-end ">

        {/* 🔍 Search Section (Left Side) */}
        <Col md={3} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label className="fw-bold text-dark">Search by Email</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="search"
                style={{
                  color: "#6c757d", 
                  height: "45px", 
                  fontSize: "14px", 
                  borderRadius: "8px"
                }}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        {/* 🎭 Select Role (Right-Aligned) */}
        <Col md={3} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label className="fw-bold text-dark">Select Role</Form.Label>
            <Form.Select 
              style={{
                color: "#6c757d", 
                height: "45px", 
                fontSize: "14px", 
                borderRadius: "8px"
              }}>
              <option value="">Select role</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>User</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* 🔄 Status Dropdown (Right Side) */}
        <Col md={2} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label className="fw-bold text-dark">{t("status", { ns: "tables" })}</Form.Label>
            <Form.Select 
              style={{
                color: "#6c757d", 
                height: "45px", 
                fontSize: "14px", 
                borderRadius: "8px"
              }}>
              <option value="">Select Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* 🔵 Reset & Search Buttons (Bigger, Centered) */}
        <Col md={4} className="d-flex justify-content-end">
          <Button 
            variant="outline-primary" 
            className="me-3 px-4 py-2" 
            style={{
              fontSize: "14px", 
              width: "130px", 
              height: "45px",
              borderRadius: "8px",
               marginBottom:"4px"
            }}>
            Reset
          </Button>
          <Button 
            variant="primary" 
            className="px-4 py-2" 
            style={{
              fontSize: "14px", 
              width: "130px", 
              height: "45px",
              borderRadius: "8px",
              marginBottom:"4px"
            }}>
           Search
          </Button>
        </Col>

      </Row>
    </div>
  );
};

export default TableSearch;
