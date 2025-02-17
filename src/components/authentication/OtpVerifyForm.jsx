import React, { useState, useRef, useEffect, useContext } from 'react';
import { LanguageContext } from '../../contentApi/LanguageContext';

const OtpVerification = ({ email, onOtpVerified }) => {
    const {t} = useContext(LanguageContext)
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== "" && index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        const predefinedOtp = "123456"; // Mock OTP for testing

        if (enteredOtp === predefinedOtp) {
            onOtpVerified();
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="otp-container">
            <h2 className="fs-20 fw-bolder mb-4">
            {t("verifyEmail", { ns: "heading" })} 
                <a href="#" className="float-end fs-12 text-primary">{t("changeMethod", { ns: "labels" })}</a>
            </h2>
            <h4 className="fs-13 fw-bold mb-2">
            {t("enterOtp", { ns: "input" })}
            </h4>
            <p className="fs-12 fw-medium text-muted">
            {t("otpSent", { ns: "message" })}<strong>{email}</strong>
            </p>
            <form className="w-100 mt-4 pt-2" onSubmit={handleSubmit}>
                <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="m-2 text-center form-control rounded"
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">
                    {t("verifyOtp", { ns: "labels" })} 
                    </button>
                </div>
                <div className="mt-5 text-muted">
                    <span>{t("didntGetCode", { ns: "message" })}</span>
                    <a href="#">{t("resend", { ns: "labels" })} (1/3)</a>
                </div>
            </form>
        </div>
    );
};

export default OtpVerification;


