import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contentApi/userContext';
import { FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { authApi } from '../../api';

const LoginForm = ({ registerPath, resetPath }) => {

    const { login } = useContext(UserContext);
    const [email, setEmail] = useState('michael.davis@medservices.org');
    const [password, setPassword] = useState('docze_123#');
    const [locale, setLocale] = useState('en');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // console.log("handle login called");
        e.preventDefault();
        try {
            const user = { email, password, locale };
            const response = await authApi.login(user);
            console.log({response:response});
            
            if (response?.data?.status == 200) {
                const accessToken = response?.data?.tokens?.access_token;
                const refreshToken = response?.data?.tokens?.refresh_token;
                const user = response?.data?.user;
                login(user, accessToken, refreshToken);
                console.log(response?.data?.message);
                alert(response?.data?.message);
                setTimeout(() => {
                    navigate('/dashboards');
                },2000)
            } else {
                console.log(`${response?.data?.name}:${response?.data?.message}`);
                alert(`${response?.data?.name}:${response?.data?.message}`);
            }
        } catch (err) {
            console.log('Login error:', err);
        } 
    };

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">Thank you for get back <strong>Nelel</strong> web applications, let's access our the best recommendation for you.</p>
            <form className="w-100 mt-4 pt-2" onSubmit={handleLogin}>
                <div className="mb-4">
                    <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email or Username" required />
                </div>
                <div className="mb-3">
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">Remember Me</label>
                        </div>
                    </div>
                    <div>
                        <Link to={resetPath} className="fs-11 text-primary">Forget password?</Link>
                    </div>
                </div>
                <div className="mt-5">
                    <button onClick={handleLogin} className="btn btn-lg btn-primary w-100">Login</button>
                </div>
            </form>
            <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative"><span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">or</span></div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Facebook">
                        <FiFacebook size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Twitter">
                        <FiTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Github">
                        <FiGithub size={16} className='text' />
                    </a>
                </div>
            </div>
            <div className="mt-5 text-muted">
                <span> Don't have an account?</span>
                <Link to={registerPath} className="fw-bold"> Create an Account</Link>
            </div>
        </>
    )
}

export default LoginForm