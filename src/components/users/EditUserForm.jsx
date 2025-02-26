import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row, Col, Button } from "react-bootstrap";
import { userApi } from '../../api'; 
import  topTost  from '../../utils/topTost'; 
import CardLoader from '../shared/CardLoader';

export default function EditUsers () {
  const { id } = useParams(); 
  console.log("User Id",id)
  const [show, setShow] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null); 
  const [roles, setRoles] = useState([
    { id: "1", name: "Admin" },
    { id: "2", name: "Editor" },
  ]); 
  const navigate = useNavigate(); 

  // Validation Schema using Yup
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
  });

  // Fetch user details based on ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await userApi.getUserById(id); 
        console.log('API Response:', userResponse); 
        console.log("Extracted User Data:", userResponse?.data?.data); // Check if data is available
        if (userResponse?.data?.status === 200) {
          setUser(userResponse.data.data); 
        } else {
          topTost("User not found!", "error");
          navigate("/en/users"); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        topTost("Error fetching user details", "error");
        navigate("/en/users"); 
      } finally {
        setLoading(false); 
      }
    };

    if (id) fetchUserData(); 
  }, [id, navigate]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedUserData = {
        userId: id,
        type: values.type,
        name: values.name,
        email: values.email,
        userName: values.userName,
        number: values.number,
        password: values.password,
        confirmPassword: values.confirmPassword,
        status: values.status,
      };
      console.log("Sending Updated Data:", updatedUserData);

      setShow(true); 
      const response = await userApi.editUser(id, updatedUserData); 
      if (response?.data?.status === 200) {
        topTost("User Updated Successfully", "success");
        setTimeout(() => {
          navigate(`/en/users/${id}`); 
        }, 2000);
      } else {
        topTost(response?.data?.message, "error");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      topTost("Error updating user", "error");
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <section className="d-flex flex-column h-auto container-xxl">
      <section className="flex-fill">
        <div className="bg-white listing-cards">
          <div className="p-4">
            {loading ? (
             <CardLoader refreshKey={loading}  />
            ) : user ? (
              <Formik
                initialValues={{
                  type: user.type || "",
                  name: user.name || "",
                  email: user.email || "",
                  userName: user.userName || "",
                  number: user.number || "",
                  password: user.password || "",
                  confirmPassword: user.confirmPassword || "",
                  status: user.status || "Active",
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Row>
                      {/* Role */}
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Role <span className="text-red">*</span></label>
                          <Field as="select" name="type" className="form-control">
                            <option value="" disabled>Select Role</option>
                            {roles.map((role) => (
                              <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                          </Field>
                          <ErrorMessage name="type" component="div" className="form-error text-danger small mt-1" />
                        </div>
                      </Col>

                      {/* Name */}
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Name <span className="text-red">*</span></label>
                          <Field type="text" name="name" className="form-control" />
                          <ErrorMessage name="name" component="div" className="form-error text-danger small mt-1" />
                        </div>
                      </Col>

                      {/* Email */}
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Email <span className="text-red">*</span></label>
                          <Field type="email" name="email" className="form-control" />
                          <ErrorMessage name="email" component="div" className="form-error text-danger small mt-1" />
                        </div>
                      </Col>

                      {/* User Name */}
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">User Name <span className="text-red">*</span></label>
                          <Field type="text" name="userName" className="form-control" />
                          <ErrorMessage name="userName" component="div" className="form-error text-danger small mt-1" />
                        </div>
                      </Col>

                      {/* Mobile Number */}
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Mobile Number <span className="text-red">*</span></label>
                          <Field type="text" name="number" className="form-control" />
                          <ErrorMessage name="number" component="div" className="form-error text-danger small mt-1" />
                        </div>
                      </Col>

                      {/* Password */}
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Password <span className="text-red">*</span></label>
                          <Field type="password" name="password" className="form-control" />
                          <ErrorMessage name="password" component="div" className="form-error text-danger small mt-1" />
                        </div>
                      </Col>

                      {/* Confirm Password */}
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Confirm Password <span className="text-red">*</span></label>
                          <Field type="password" name="confirmPassword" className="form-control" />
                          <ErrorMessage name="confirmPassword" component="div" className="form-error text-danger small mt-1" />
                        </div>
                      </Col>

                      {/* Status */}
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Status <span className="text-red">*</span></label>
                          <Field as="select" name="status" className="form-control">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </Field>
                          <ErrorMessage name="status" component="div" className="form-error text-danger small mt-1" />
                        </div>
                      </Col>
                    </Row>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center pt-4 gap-3">
                      <Button variant="danger" onClick={() => navigate("/en/users")}>Cancel</Button>
                      <Button type="submit" variant="primary" disabled={isSubmitting}>Update User</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <p className="text-danger">User not found!</p> 
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
