import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import topTost from '@/utils/topTost';
import { Formik, Field, ErrorMessage } from "formik";
import { FiAlignRight, FiArrowLeft } from 'react-icons/fi'
import * as Yup from "yup";
import { LanguageContext } from '../../contentApi/LanguageContext';
//import PatientSearchHeader from "@/components/patient/PatientSearchHeader";



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

export default function AddUser({ children }) {

  const { t } = useContext(LanguageContext);
  const [openSidebar, setOpenSidebar] = useState(false)

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


  const onSubmit = async (data, { setSubmitting, resetForm }) => {

    // console.log('data >>>>>>>>>>>>>>>>>>>>', data)

    setSubmitting(true);
    setLoading(true);

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
        "status": data?.status

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
    <>

      {/* <PatientSearchHeader /> */}

      <div className="page-header">
        <div className="page-header-left d-flex align-items-center">
          <div className="page-header-title d-flex">
          <Link to="#" onClick={() => setOpenSidebar(false)} className="page-header-right-close-toggle">
                <FiArrowLeft size={16} className="me-2" />
          </Link>
            <h5 className="m-b-10 text-capitalize">Add Users</h5>
          </div>
        </div>
        <div className="page-header-right ms-auto">
          <div className={`page-header-right-items ${openSidebar ? "page-header-right-open" : ""}`}>
            <div className="d-flex d-md-none">
              <Link to="#" onClick={() => setOpenSidebar(false)} className="page-header-right-close-toggle">
                <FiArrowLeft size={16} className="me-2" />
                <span>{t("back", { ns: "button" })}</span>
              </Link>
            </div>
            {children}
          </div>
          <div className="d-md-none d-flex align-items-center">
            <Link to="#" onClick={() => setOpenSidebar(true)} className="page-header-right-open-toggle">
              <FiAlignRight className="fs-20" />
            </Link>
          </div>
        </div>
      </div>
      <section className="d-flex flex-column h-auto container-xxl">
        <div className="mt-4">
          <section className="flex-fill">
            <div className="bg-white listing-cards">
              <div className="p-4">
                <Formik
                  initialValues={{ type: "", name: "", email: "", userName: "", number: "", password: "", confirmPassword: "", status: "", }}
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
        </div>
      </section>
    </>
  );

}
