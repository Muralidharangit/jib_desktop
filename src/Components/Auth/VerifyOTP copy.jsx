import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../../API/authAPI";
import routes from "../routes/route";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userMobile = location.state?.mobile; // Get mobile from previous page
  const usertype = location.state?.type;

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if current input is filled
      if (value && index < otp.length - 1) {
        document.getElementById(`otp${index + 2}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      setIsSubmitting(false);
      return;
    }

    // console.log("====================================");
    // console.log("enteredOtp", enteredOtp);
    // console.log("====================================");

    try {
      const response = await verifyOTP(userMobile, enteredOtp, usertype); // Pass mobile and OTP

      // console.log(response,"OTP",userMobile,usertype);
      if (response.status === "success") {
        localStorage.setItem("token", response.token); // Save token
        navigate(routes.home); // Redirect on success
      } else {
        setError(response.msg || "Invalid OTP. Try again.");
      }
    } catch (err) {
      setError("OTP verification failed. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleResend = async () => {
    if (!userMobile) {
      setError("User mobile number is missing.");
      return;
    }
    try {
      await verifyOTP(userMobile); // Pass mobile number for OTP request
      alert("OTP resent successfully!");
    } catch (err) {
      setError("Failed to resend OTP. Try again.");
    }
  };

  return (
    <section className="container">
      <div className="pt-3 pb-2">
        <div className="logo d-flex justify-content-center mb-2">
          <img src="assets/img/fav.png" alt="favicon" width="75%" />
        </div>
        <div className="p-3">
          <div className="py-4">
            <h3 className="title text-center">Enter OTP</h3>
            <p className="text-white text-center">
              A 4-digit code has been sent to {userMobile}. Enter it below to
              verify.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center mb-4 otp-page">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control text-center otp-box"
                  maxLength={1}
                  id={`otp${index + 1}`}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

            <button
              type="submit"
              className="btn btn-login w-100 my-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify"}{" "}
              <i className="ri-check-line text-white fs-20" />
            </button>
          </form>

          <div className="text-center">
            <p className="text-white">
              Didn't receive the OTP?{" "}
              <span
                className="text-red fw-600"
                onClick={handleResend}
                style={{ cursor: "pointer" }}
              >
                Resend OTP
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTP;
