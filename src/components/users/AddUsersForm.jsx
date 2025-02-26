import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userApi ,roleApi } from '../../api'; 
import topTost from '@/utils/topTost';



export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  // const roles = [
  //   { id: "4464105c-0bf4-488a-9a68-e7fba943e3c6", name: "Testor" },
  //   { id: "6c7b2c6d-0bf4-4c4b-91eb-f3aee234abcd", name: "Editor" },
  // ];
  const navigate = useNavigate();

  
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Role is required"),
    name: Yup.string().min(4, "Minimum 4 characters").max(20, "Maximum 20 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    userName: Yup.string().min(4, "Minimum 4 characters").max(20, "Maximum 20 characters").required("User Name is required"),
    // number: Yup.string()
    //   .matches(/^[0-9]+$/, "Only numbers allowed")
    //   .min(10, "Must be 10 digits")
    //   .max(10, "Must be 10 digits")
    //   .required("Number is required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    status: Yup.string().required("Status is required"),
  });

  useEffect(() => {
    const fetchRoles = async () => {
     // console.log("Fetching countries")
      try {
        const response = await roleApi.getRolesDD();  
        if (response?.data?.status === 200) {
        //  console.log("Response data",response?.data)
        setRoles(response?.data?.data);  
        } else {
          topTost("Failed to load Roles", "error");
        }
      } catch (error) {
        topTost("Error: " + error.message, "error");
      }
    };
    fetchRoles();
  }, []);
  
  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    setLoading(true);
    setSubmitting(true);

    console.log(" Sending Data to API: ", data);
    try {
      const userData = {
        user_type: "Organization",
        name: data.name,
        email: data.email,
        username: data.userName,
       // phone: data.number, 
        password: data.password,
        role: data.type,
        parent_id: 0,
      };

      //  API Call
      const response = await userApi.createUser(userData);
      console.log(" API Response:", response);

      if (response?.data?.status === 200) {
        topTost("User Created Successfully", "success");
        resetForm();
        setTimeout(() => {
          navigate("/en/users");
        }, 2000);
      } else {
        topTost(response?.data?.message, "error");
      }
    } catch (error) {
      console.error(" API Error: ", error);
      topTost("Error: " + error?.message, "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className="d-flex flex-column h-auto container-xxl">
      <section className="flex-fill">
        <div className="bg-white listing-cards">
          <div className="p-4">
            <Formik
              initialValues={{
                type: "", name: "", email: "", userName: "", password: "", confirmPassword: "", status: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>  
                  <Row>

                    {/* Role */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Role <span className="text-red">*</span></Form.Label>
                        <Field as="select" name="type" className="form-control">
                          <option value="" disabled>Select Role</option>
                          {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.role_name}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="type" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Name */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name <span className="text-red">*</span></Form.Label>
                        <Field type="text" name="name" className="form-control" placeholder="Enter Name" />
                        <ErrorMessage name="name" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Email */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email <span className="text-red">*</span></Form.Label>
                        <Field type="email" name="email" className="form-control" placeholder="Enter Email" />
                        <ErrorMessage name="email" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* User Name */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Username <span className="text-red">*</span></Form.Label>
                        <Field type="text" name="userName" className="form-control" placeholder="Enter Username" />
                        <ErrorMessage name="userName" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Phone Number */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number <span className="text-red">*</span></Form.Label>
                        <Field type="text" name="number" className="form-control" placeholder="Enter Phone Number" />
                        <ErrorMessage name="number" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Password */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password <span className="text-red">*</span></Form.Label>
                        <Field type="password" name="password" className="form-control" placeholder="Enter Password" />
                        <ErrorMessage name="password" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Confirm Password */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password <span className="text-red">*</span></Form.Label>
                        <Field type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" />
                        <ErrorMessage name="confirmPassword" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Status */}
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
