
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import topTost from "@/utils/topTost";
import OtpVerification from "./OtpVerifyForm";
import { FiGithub, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const practitioners = ["Solo Practice", "Group Practice", "Multi-Clinic Network"];
const designations = ["Doctor", "Clinic Administrator", "Clinic Manager"];
const countries = ["Luxembourg", "Belgium", "France"];

const RegisterForm = () => {

  const { t, i18n } = useTranslation(['input', 'message']);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const validationSchema = Yup.object({
    typeOfPractice: Yup.string().required("Type of practice is required"),
    designation: Yup.string().required("Designation is required"),
    country: Yup.string().required("Country is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  const basicDetailsSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    mobileNumber: Yup.string().matches(/^\d{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
    registration: Yup.string().matches(/^\d+$/, "Registration number must be numeric").required("Required for Profile Completion"),
  });

  const handleSendOtp = (values) => {
    setEmail(values.email);
    topTost("OTP sent to your email!");
    setStep(2);
  };


  const handleBasicDetailsSubmit = () => {
    topTost("Account created successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };



  return (
    <div>
      {step === 1 && (
        <Formik
          initialValues={{ typeOfPractice: "", designation: "", country: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSendOtp}
        >
          {({ values }) => (
            <Form>
              <h2>Register</h2>
              <div className="mb-3">
                <Field as="select" name="typeOfPractice" className="form-control">
                  <option value=""> Practice Type</option>
                  {practitioners.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="typeOfPractice" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <Field as="select" name="designation" className="form-control">
                  <option value=""> Your Designation</option>
                  {designations.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="designation" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <Field as="select" name="country" className="form-control">
                  <option value=""> Country</option>
                  {countries.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="country" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <Field type="email" name="email" className="form-control" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-4 position-relative">
                <div className="input-group">
                  <Field type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Enter password" />

                  <span className="input-group-text position-absolute eye-icon"
                    style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", backgroundColor: "white", border: "none" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>

                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <div className="mb-4 position-relative">
                <div className="input-group">
                  <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="form-control" placeholder="Confirm password" />

                  <span className="input-group-text position-absolute eye-icon"
                    style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", backgroundColor: "white", border: "none" }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                  </span>

                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-lg w-100 btn-primary">
                Send OTP
              </button>
            </Form>
          )}
        </Formik>
      )}
      {step === 2 && <OtpVerification onOtpVerified={() => setStep(3)} email={email} />}

      {step === 3 && (
        <Formik
          initialValues={{ fullName: "", mobileNumber: "", registration: "" }}
          validationSchema={basicDetailsSchema}
          onSubmit={handleBasicDetailsSubmit}
        >
          <Form>
            <h2 className="mb-4">User Details</h2>
            <div className="mb-3">
              <Field type="text" name="fullName" className="form-control" placeholder=" Full name" />
              <ErrorMessage name="fullName" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <Field type="text" name="registration" className="form-control" placeholder=" Medical Registration Number" />
              <ErrorMessage name="registration" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <Field type="text" name="mobileNumber" className="form-control" placeholder=" Phone number" />
              <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
            </div>
            <div className="mb-3 form-check">
              <Field type="checkbox" name="terms" className="form-check-input" />
              <label className="form-check-label">I agree to the terms and conditions and Privacy Policy</label>
              <ErrorMessage name="terms" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn  btn-primary btn-lg w-100">Create Account</button>
          </Form>
        </Formik>
      )}
       <div className="w-100 mt-4 text-center mx-auto">
        <div className="mb-3 border-bottom position-relative">
          <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">
            or
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title={t("loginWithFacebook", { ns: "input" })}>
            <FaGoogle size={16} />
          </a>
          <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title={t("loginWithTwitter", { ns: "input" })}>
            <FaLinkedin size={16} />
          </a>

        </div>
      </div>
      <div className="mt-4 text-muted ">
        <span> Already have an Account</span>
        <Link to={`/${i18n.language}/login`} className="fw-bold">
          Login
        </Link>
      </div>


    </div>
  );
};

export default RegisterForm;