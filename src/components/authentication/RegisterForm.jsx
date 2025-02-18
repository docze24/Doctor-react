import React, { useState, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import topTost from "@/utils/topTost";
import OtpVerification from "./OtpVerifyForm";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authApi } from '../../api';

import { useNavigate } from 'react-router-dom';
import { UserContext  } from "../../contentApi/userContext";  // Import UserContext
import { LanguageContext } from "../../contentApi/LanguageContext";


const practitioners = ["Solo Practice", "Group Practice", "Multi-Clinic Network"];
const designations = ["Doctor", "Clinic Administrator", "Clinic Manager"];
const countries = ["Luxembourg", "Belgium", "France"];

const RegisterForm = () => {
 
 const {t} = useContext(LanguageContext);

  const { signup } = useContext(UserContext);  // Access signup function from UserContext
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  const validationSchema = Yup.object({
    typeOfPractice: Yup.string().required("Type of practice is required"),
    designation: Yup.string().required("Designation is required"),
    country: Yup.string().required("Country is required"),
    name: Yup.string().required("Your Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "At least one uppercase letter is required")
      .matches(/[a-z]/, "At least one lowercase letter is required")
      .matches(/[0-9]/, "At least one number is required")
      .matches(/[!@#$%^&*]/, "At least one special character is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .trim()
      .required("Confirm password is required"),
  });

  
  const basicDetailsSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    registration: Yup.string().required("Medical Registration Number is required"),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    terms: Yup.bool().oneOf([true], "You must agree to the terms and conditions"),
  });

  const handleSendOtp = (values) => {
    setEmail(values.email);
    topTost("OTP sent to your email!");
    setStep(2);
  };

  const handleSignupSubmit = async (values) => {

    console.log('handleSignupSubmit')
    try {
      const user = {
        email: values.email,
        password: values.password,
        userType: values.typeOfPractice,
        userName: values.email,
        firstName: values.name,
        lastName: values.name,
        designation: values.designation,
        country: values.country,
        //registration: values.registration,
        //mobileNumber: values.mobileNumber,
      };
      setEmail(values.email);

      //console.log('handleSignupSubmit',user)

      // Call signup API
      const response = await authApi.signup(user);
      if (response?.data?.status === 200) {
        setStep(2);
        topTost(response?.data?.message, "success");
        
      } else {
        topTost(response?.data?.message, "error");
      }
    } catch (err) {
      console.log("Signup error:", err);
      topTost("Signup failed!", "error");
    }
  };

  return (
    <div>
      {step === 1 && (
        <Formik
          initialValues={{ typeOfPractice: "", designation: "", country: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignupSubmit}
        >
          {({ values }) => (
            <Form>
              <h2>{t('registerTitle')}</h2>
              <div className="mb-3">
                <Field as="select" name="country" className="form-control text-black-50">
                  <option value="">{t('country')}</option>
                  {countries.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="country" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <Field as="select" name="typeOfPractice" className="form-control text-black-50">
                  <option value="">{t('practiceType')}</option>
                  {practitioners.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="typeOfPractice" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <Field as="select" name="designation" className="form-control text-black-50">
                  <option value="">{t('designation')}</option>
                  {designations.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </Field>
                <ErrorMessage name="designation" component="div" className="text-danger" />
              </div>

              <div className="mb-3 ">
                <Field  type="email" name="email" className="form-control" placeholder={t('email')} />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3 ">
                <Field  type="name" name="name" className="form-control" placeholder={t('name')} />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="mb-4 position-relative">
                <div className="input-group">
                  <Field type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder={t('password')} />
                  <span 
                    className="input-group-text position-absolute eye-icon" 
                    style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", border: "none" }} 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-4 position-relative ">
                <div className="input-group">
                  <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="form-control" placeholder={t('confirmPassword')} />
                  <span 
                    className="input-group-text position-absolute eye-icon" 
                    style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", border: "none" }} 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-lg w-100 btn-primary">
              {t('sendOtp')}
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
          onSubmit={handleSignupSubmit}  // Updated to handleSignupSubmit function
        >
          <Form>
            <h2 className="mb-4">  {t('userDetails',{ ns: "heading" })}</h2>
            <div className="mb-3">
              <Field type="text" name="fullName" className="form-control" placeholder={t('fullName')} />
              <ErrorMessage name="fullName" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <Field type="text" name="registration" className="form-control" placeholder={t('registration')} />
              <ErrorMessage name="registration" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <Field type="text" name="mobileNumber" className="form-control" placeholder={t('mobileNumber')} />
              <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
            </div>
            <div className="mb-3 form-check">
              <Field type="checkbox" name="terms" className="form-check-input" />
              <label className="form-check-label">{t('terms')}</label>
              <ErrorMessage name="terms" component="div" className="text-danger" />
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-lg btn-primary w-100">
              {t('createAccount')}
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default RegisterForm;





