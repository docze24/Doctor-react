
import React, { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { BiCaretLeft  } from "react-icons/bi";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import topTost from '@/utils/topTost';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { createUser, getAllRoleslisting } from "@/lib/api/user";
//import { getBusinessDDList, getPlantMasters, getPlantMastersDDList, getPoductTypeDDList } from "@/lib/api/skus";


   // Dummy JSON data for roles
   const dummyRoles = [
    { id: 1, role_type_name: "Admin" },
    { id: 2, role_type_name: "Editor" },
    { id: 3, role_type_name: "Viewer" },
  ];

  const dummyStatuses = [
    { id: 1, status_type_name: "Active" },
    { id: 2, status_type_name: "Inactive" },
  ];

export default function AddUser() {
   
    const [roles, setRoles] = useState(dummyRoles);
    const [statuses, setStatuses] = useState(dummyStatuses);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  //  Validation Schema using Yup
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
  
    
    useEffect(() => {
        setRoles(dummyRoles);
        setStatuses(dummyStatuses);
    }, [])


    const setData = async () => {
        let roleData = await getAllRoleslisting();
        if (roleData?.status == 'success' && roleData?.data) {
            setRoles(roleData?.data);
        }
    }
       

    const onSubmit = async (data,{setSubmitting , resetForm}) => {

        // console.log('data >>>>>>>>>>>>>>>>>>>>', data)

        setSubmitting(true); //  Start Submission (Disables the Submit Button)
        setLoading(true); //  Set Loading State

        try {
            setShow(true);
            let userData = {
                "roleTypeId": data?.type,
                "name": data?.name,
                "userEmail": data?.email,
                "userName": data?.userName,
                "userMobile": data?.number,
                "password": data?.password,
                "confirmPassword": data?.confirmPassword,
                "status":data?.status
                             
            }
            // console.log('User Created Successfully >>>>>>>>>>>>>>>>>>>>', userData)
            let userCreated = await createUser(userData);
            if (userCreated?.status == 'success') {
                setShow(true);
                topTost("User Created Successfully");
                resetForm();
                setSubmitting(false);
                setLoading(false);
                setTimeout(() => {
                    navigate("/admin/users");
                }, 2000);
            } else {
                setShow(true);
                topTost(userCreated?.message);
                setTimeout(() => {
                    setShow(false);
                }, 2000);
            }
        } catch (error) {
            topTost("Error : " + error?.message)
        }
    }

    

    return (
        <section className="d-flex flex-column h-auto container-xxl">
          <div className="bg-white p-3 d-flex align-items-center gap-3 mb-2 actionBar listing-cards mt-2">
            <Link to="/users" className="btn-icon">
              <BiCaretLeft />
            </Link>
            <label className="medium mb-0 me-3">Add User</label>
          </div>
          <section className="flex-fill">
            <div className="bg-white listing-cards">
              <div className="p-4">
                <Formik
                  initialValues={{ type: "",   name: "",   email: "",   userName: "",   number: "",   password: "",   confirmPassword: "",   status: "", }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit} //  Called outside the return
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Row>
                        {/* Role */}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Role <span className="text-red">*</span></Form.Label>
                            <Field as="select" name="type" className="form-control">
                              <option value="" disabled>Select Role</option>
                              {roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.role_type_name}</option>
                              ))}
                            </Field>
                            <ErrorMessage name="type" component="div" className="form-error text-danger small mt-1" />
                          </Form.Group>
                        </Col>
    
                        {/* Name */}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Name <span className="text-red">*</span></Form.Label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="form-error text-danger small mt-1" />
                          </Form.Group>
                        </Col>
    
                        {/* Email */}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email <span className="text-red">*</span></Form.Label>
                            <Field type="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="form-error text-danger small mt-1" />
                          </Form.Group>
                        </Col>
    
                        {/* User Name */}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>User Name <span className="text-red">*</span></Form.Label>
                            <Field type="text" name="userName" className="form-control" />
                            <ErrorMessage name="userName" component="div" className="form-error text-danger small mt-1" />
                          </Form.Group>
                        </Col>
    
                        {/* Mobile Number */}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Mobile Number <span className="text-red">*</span></Form.Label>
                            <Field type="text" name="number" className="form-control" />
                            <ErrorMessage name="number" component="div" className="form-error text-danger small mt-1" />
                          </Form.Group>
                        </Col>
    
                        {/* Password */}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Password <span className="text-red">*</span></Form.Label>
                            <Field type="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="form-error text-danger small mt-1" />
                          </Form.Group>
                        </Col>
    
                        {/* Confirm Password */}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Confirm Password <span className="text-red">*</span></Form.Label>
                            <Field type="password" name="confirmPassword" className="form-control" />
                            <ErrorMessage name="confirmPassword" component="div" className="form-error text-danger small mt-1" />
                          </Form.Group>
                        </Col>
    
                        {/* Status */}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Status <span className="text-red">*</span></Form.Label>
                            <Field as="select" name="status" className="form-control">
                              <option value="" disabled>Select Status</option>
                              {statuses.map((status) => (
                                <option key={status.id} value={status.id}>{status.status_type_name}</option>
                              ))}
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
