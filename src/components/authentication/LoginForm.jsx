import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contentApi/userContext';
import { FiFacebook, FiGithub, FiTwitter, FiEye, FiEyeOff } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';
import { authApi } from '../../api';
import { useTranslation } from 'react-i18next';
import topTost from '@/utils/topTost';
import { useFormik } from 'formik'; 
import { loginSchema } from '../../schema/authSchema'; 

const LoginForm = ({ registerPath, resetPath }) => {
    const { t, i18n } = useTranslation(['input', 'message']);
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    
    const formik = useFormik({
        initialValues: {
            email: 'michael.davis@medservices.org',
            password: 'docze_123#',
            rememberMe: false,
        },
        validationSchema: loginSchema,  
        onSubmit: async (values) => {
            try {
                const user = { email: values.email, password: values.password, locale: 'en' };
                const response = await authApi.login(user);
                console.log({ response: response });

                if (response?.data?.status === 200) {
                    const accessToken = response?.data?.tokens?.access_token;
                    const refreshToken = response?.data?.tokens?.refresh_token;
                    const user = response?.data?.user;
                    login(user, accessToken, refreshToken);
                    topTost(response?.data?.message, "success");

                    setTimeout(() => {
                        navigate('/en/dashboards');
                    }, 2000);
                } else {
                    topTost(response?.data?.message, "error");
                }
            } catch (err) {
                console.log('Login error:', err);
                topTost('Login failed!', "error");
            }
        },
    });

    
    const handleClickShowPassword = () => {
     setShowPassword(!showPassword); 
    };

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">{t("login", { ns: "message" })}</h2>
            <h4 className="fs-13 fw-bold mb-2">{t("loginSubtitle", { ns: "message" })}</h4>
            <p className="fs-12 fw-medium text-muted">{t("welcomeMessage", { ns: "message" })}</p>
            <form className="w-100 mt-4 pt-2" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        placeholder={t("emailOrUsername", { ns: "input" })}
                        required
                    />
                    {formik.touched.email && formik.errors.email && (
                        <small className="text-danger">{formik.errors.email}</small>
                    )}
                </div>
                <div className="mb-3 position-relative"> 
                    <input
                        type={showPassword ? "text" : "password"}  
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        placeholder={t("password", { ns: "input" })}
                        required
                    />
                    <div 
                        onClick={handleClickShowPassword}  
                        className="position-absolute" 
                        style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                    >
                        {showPassword ? <FiEye size={18} /> :  <FiEyeOff size={18} />} 
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <small className="text-danger">{formik.errors.password}</small>
                    )}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formik.values.rememberMe}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">
                                {t("rememberMe",{ ns: "input" })}
                            </label>
                        </div>
                    </div>
                    <div>
                        <Link to={`/${i18n.language}/forgot-password`} className="fs-11 text-primary">
                            {t("forgetPassword",{ ns: "input" })}
                        </Link>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">
                        {t("login", { ns: "message" })}
                    </button>
                </div>
            </form>
            <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative">
                    <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">
                        or
                    </span>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title={t("loginWithFacebook", { ns: "input" })}>
                        <FiFacebook size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title={t("loginWithTwitter", { ns: "input" })}>
                        <FiTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title={t("loginWithGithub", { ns: "input" })}>
                        <FiGithub size={16} className="text" />
                    </a>
                </div>
            </div>
            <div className="mt-5 text-muted">
                 <span> {t("dontHaveAccount", { ns: "input" })}</span>
                 <Link to={`/${i18n.language}/signup`} className="fw-bold">
                    {t("createAccount", { ns: "input" })}
                </Link>
            </div>
        </>
    );
};

export default LoginForm;
