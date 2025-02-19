import React, { useEffect, useState } from "react"
import { BiCaretLeft, BiInfoCircle } from "react-icons/bi";
import {Link} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Row, Col ,Button} from "react-bootstrap";
//import { editUser } from "../../api/users";
//import { getAllRoleslisting, getUserById } from "@/lib/api/user";

//  Dummy JSON data for roles
const dummyRoles = [
    { id: 1, role_type_name: "Admin" },
    { id: 2, role_type_name: "Editor" },
    { id: 3, role_type_name: "Viewer" },
  ];

  //  Dummy users list
const dummyUsers = [
    { id: "1", type: "1", name: "John Doe", email: "john@example.com", userName: "johndoe", number: "1234567890", password: "password123",confirmPassword: "password123", status: "Active" },
    { id: "2", type: "2", name: "Jane Smith", email: "jane@example.com", userName: "janesmith", number: "9876543210", password: "password456",confirmPassword: "password123", status: "Inactive" },
  ];

export default function EditUser({ userId }) {

    const { id } = useParams(); // Get user id
    const [show, setShow] = useState(false);
    const [roles, setRoles] = useState(dummyRoles);
    const [users, setUsers] = useState(dummyUsers);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    


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

    //  Fetch user details based on ID
  useEffect(() => {
    console.log(" Users Data:", users); // Debugging

     //  Ensure users is an array before using `.find()`
    if (Array.isArray(users)) {
      const foundUser = users.find((u) => u.id === id);
      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error(" User not found for ID:", id);
      }
    } else {
      console.error(" users is not an array:", users);
    }
  }, [id, users]);

    const setData = async () => {
        let userData = await getUserById(userId);
        let roleData = await getAllRoleslisting();
       

        if (userData?.status == 'success' && userData?.data) {
            let defaultValues = {};
            defaultValues = {
                userName: userData?.data?.userName,
                userEmail: userData?.data?.userEmail,
                userMobile: userData?.data?.userMobile,
                roleTypeId: userData?.data?.roleTypeId,
            }
           
        };

        if (roleData?.status == 'success' && roleData?.data) {
            setRoleType(roleData?.data);
        }
        
    };

    

    const onSubmit = async (values,{setSubmitting}) => {

         //  Simulate updating the user in the dummy list
      setUsers(users.map((u) => (u.id === id ? values : u)));

        // console.log('data >>>>>>>>>>>>>>>>>>>>', data)
        try {
            setShow(true);
            let userData = {
                "userId": userId,
                "roleTypeId": data?.type,
                "name": data?.name,
                "userEmail": data?.email,
                "userName": data?.userName,
                "userMobile": data?.number,
                "password": data?.password,
                "confirmPassword": data?.confirmPassword,
                "status":data?.status
                
            }
            // console.log('userData >>>>>>>>>>>>>>>>>>>>', userData)
            let userUpdated = await editUser(userData);
            if (userUpdated?.status == 'success') {
                setShow(true);
                notifySuccess(userUpdated?.message);
                setTimeout(() => {
                    navigate("/admin/users");
                    setSubmitting(false);
                }, 2000);
            } else {
                setShow(true);
                notifyError(userUpdated?.message);
                setTimeout(() => {
                    setShow(false);
                }, 2000);
            }
        } catch (error) {
            notifyError("Error : " + error?.message)
        }
    }
    

    return (

        <section className="d-flex flex-column h-auto container-xxl ">
        <div className="bg-white p-3 d-flex align-items-center gap-3 mb-2 actionBar listing-cards mt-4">
          <Link to="/admin/users" className="btn-icon">
            <BiCaretLeft />
          </Link>
          <label className="medium mb-0 me-3">Edit User</label>
        </div>
  
        <section className="flex-fill">
          <div className="bg-white listing-cards">
            <div className="p-4">
              {user ? (
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
                                <option key={role.id} value={role.id}>{role.role_type_name}</option>
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

                         {/*Confirm Password */}
                         <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label"> Confirm Password <span className="text-red">*</span></label>
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
                        <Button variant="danger" onClick={() => navigate("/admin/users")}>Cancel</Button>
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
    )

}
