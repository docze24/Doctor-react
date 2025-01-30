import * as Yup from 'yup';

// Login form validation schema
export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')  
        .required('Email is required'), 
    
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters') 
        .required('Password is required'), 
    
    rememberMe: Yup.bool() 
});


// Signup Validation Schema
export const signupValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    
    selectedPractitioner: Yup.string()
      .required('Please select your practitioner'),
    
    selectedCountry: Yup.string()
      .required('Please select your country'),
    
    otp: Yup.string()
      .required('OTP is required')
      .length(6, 'OTP must be 6 digits'), // assuming OTP is a 6-digit number
  
    fullName: Yup.string()
      .required('Full name is required'),
  
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
  
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .max(20, 'Username must be less than 20 characters')
      .required('Username is required'),
  
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });