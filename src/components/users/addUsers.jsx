import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userApi } from '../../api'; // Import the userApi module
import topTost from '@/utils/topTost';
import axiosInstance from '../../api/axiosInstance'; // Import your axios instance

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
  ]); // State to store the roles dynamically
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Role is required"),
    name: Yup.string().min(4, "Minimum 4 characters").max(20, "Maximum 20 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    userName: Yup.string().min(4, "Minimum 4 characters").max(20, "Maximum 20 characters").required("User Name is required"),
    number: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers allowed")
      .min(10, "Must be 10 digits")
      .max(10, "Must be 10 digits")
      .required("Number is required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    status: Yup.string().required("Status is required"),
    address: Yup.string().max(100, "Address too long").required("Address is required"), // Adding address validation
  });

  // Form submission handler
  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    setLoading(true); // Show loading spinner
    try {
      // Create user data to send in the POST request
      const userData = {
        user_type: "Organization",
        name: data.name,
        email: data.email,
        username: data.userName,
        phone: data.number,  // Adding phone number
        password: data.password,
        role: data.type, // Role selected dynamically
        parent_id: 0, // Adjust this value as needed
        address: data.address, // Address field
      };

      // Make the POST request to create the user
      const response = await axiosInstance.post('/doctor-user', userData);
      if (response?.data?.status === 200) {
        topTost("User Created Successfully", "success"); // Show success message
        resetForm(); // Reset form after successful creation
        setSubmitting(false);
        setLoading(false);
        setTimeout(() => {
          navigate("/admin/users"); // Redirect to the users list page
        }, 2000);
      } else {
        topTost(response?.data?.message, "error"); // Show error message if any
      }
    } catch (error) {
      topTost("Error: " + error?.message, "error"); // Show error message on failure
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <section className="d-flex flex-column h-auto container-xxl">
      <section className="flex-fill">
        <div className="bg-white listing-cards">
          <div className="p-4">
            <Formik
              initialValues={{
                type: "", name: "", email: "", userName: "", number: "", password: "", confirmPassword: "", status: "", address: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Row>
                    {/* Role Dropdown (Dynamic) */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Role <span className="text-red">*</span></Form.Label>
                        <Field as="select" name="type" className="form-control">
                          <option value="" disabled>Select Role</option>
                          {/* Dynamically populate roles */}
                          {roles.map(role => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="type" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* User Name Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name <span className="text-red">*</span></Form.Label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter Name"
                        />
                        <ErrorMessage name="name" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Email Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email <span className="text-red">*</span></Form.Label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                        />
                        <ErrorMessage name="email" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* User Name (Username Field) */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Username <span className="text-red">*</span></Form.Label>
                        <Field
                          type="text"
                          name="userName"
                          className="form-control"
                          placeholder="Enter Username"
                        />
                        <ErrorMessage name="userName" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Phone Number Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number <span className="text-red">*</span></Form.Label>
                        <Field
                          type="text"
                          name="number"
                          className="form-control"
                          placeholder="Enter Phone Number"
                        />
                        <ErrorMessage name="number" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Password Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password <span className="text-red">*</span></Form.Label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter Password"
                        />
                        <ErrorMessage name="password" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Confirm Password Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password <span className="text-red">*</span></Form.Label>
                        <Field
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm Password"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Status Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status <span className="text-red">*</span></Form.Label>
                        <Field as="select" name="status" className="form-control">
                          <option value="" disabled>Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    
                  </Row>

                  {/* Buttons */}
                  <div className="d-flex text-center justify-content-center pt-5 m-0 gap-4">
                    <Button variant="danger btn-md-width" onClick={() => navigate("/admin/users")}>Cancel</Button>
                    <Button type="submit" variant="primary btn-md-width" disabled={isSubmitting || loading}>
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </section>
  );
}
