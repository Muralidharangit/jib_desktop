import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../Auth/AuthContext";
import { getAuthType, loginUser, verifyOTP } from "../../API/authAPI"; // Renamed verifyOTP import
import routes from "../routes/route";

<style>
  
</style>

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [authType, setAuthType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(routes.home);
    }
    const getAuthTypes = async () => {
      try {
        const res = await getAuthType(); // e.g., returns { type: "default" }
        // console.log(res);
        setAuthType(res.type);
      } catch (error) {
        console.error("Error fetching auth types:", error);
      } finally {
        setLoading(false);
      }
    };
    getAuthTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      user_mobile: "",
      user_password: "",
      static_otp: "",
    },
    validationSchema: Yup.object().shape({
      user_mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      user_password:
        authType === "default"
          ? Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required")
          : Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (authType === "default") {
          const data = await loginUser(
            values.user_mobile,
            values.user_password
          );
          // if (data.status === "success") {
          //   localStorage.setItem("token", data.token);
          //   login(data.token);
          //   navigate(routes.home);
          // } else {
          //   setErrors({ api: data.msg || "Invalid credentials" });
          // }
          if (data.status === "success") {
            localStorage.setItem("token", data.token);
            login(data.token);
            // navigate(routes.home);
            // ✅ Pass success message via state
            navigate(routes.home, { state: { showLoginSuccess: true } });
          } else {
            // console.log(data.errors[0]);

            const fieldErrors = {};
            data.errors.forEach((err) => {
              const field = Object.keys(err)[0];
              // Map API field name to formik field name
              if (field === "mobile") {
                fieldErrors["user_mobile"] = err[field];
              } else {
                fieldErrors[field] = err[field];
              }
            });
            setErrors(fieldErrors);
          }
        } else if (authType === "otp") {
          const otpResponse = await loginUser(values.user_mobile); // Using the renamed function
          // console.log("OTP Request Response:", otpResponse);
          if (otpResponse && otpResponse.status === "success") {
            // console.log("Navigating to /verify-otp");
            navigate(routes.auth.verifyOTP, {
              state: { mobile: values.user_mobile, type: "login", authType },
            });
          } else {
            console.error("OTP request failed:", otpResponse);
            setErrors({ api: otpResponse?.msg || "OTP request failed" });
          }
        } else if (authType === "static_otp") {
          // console.log(authType, "static otp");
          const staticLoginResponse = await loginUser(values.user_mobile);

          // console.log(staticLoginResponse);
          if (staticLoginResponse.status === "success") {
            localStorage.setItem("token", staticLoginResponse.token);
            login(staticLoginResponse.token);
            navigate(routes.auth.verifyOTP, {
              state: { mobile: values.user_mobile, type: "login", authType },
            });
          } else {
            setErrors({ api: staticLoginResponse.msg || "Invalid Static OTP" });
          }
        }
      } catch (error) {
        // console.log(error.response?.data?.msg);

        console.error("Error during login/OTP request:", error);
        setErrors({
          api: error.response?.data?.msg || "Login failed. Please try again.",
        });
        // setErrors(
        //   error.response?.data?.msg || "Login failed. Please try again."
        // );
      }
      setSubmitting(false);
    },
  });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <section className="container vh-100 position-relative overflow-hidden">
      <div className="pt-3 pb-2 h-100">
        <div className="logo d-flex justify-content-center mb-2">
          <img src="assets/img/fav.png" alt="Logo" width="75%" />
        </div>
        <div className="p-3 h-100 d-flex justify-content-start flex-column">
          <div className="py-4 pt-0">
            <h3 className="title text-center text-uppercase">Sign In</h3>
          </div>
          <div className="form">
            {authType === "default" ? (
              <form onSubmit={formik.handleSubmit}>
                {/* Show API Error Message */}
                {formik.errors.api && (
                  <p className="text-danger">{formik.errors.api}</p>
                )}

                {/* Mobile Input */}
                <div className="input-groups mb-4">
                  <label
                    htmlFor="user_mobile"
                    className="form-label text-white"
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="user_mobile"
                    name="user_mobile"
                    value={formik.values.user_mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.user_mobile && formik.errors.user_mobile && (
                    <p className="text-danger">{formik.errors.user_mobile}</p>
                  )}
                </div>

                {/* Password Input (Only for Default Auth Type) */}
                <div className="input-groups mb-4">
                  <label
                    htmlFor="user_password"
                    className="form-label text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="user_password"
                    name="user_password"
                    value={formik.values.user_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.user_password &&
                    formik.errors.user_password && (
                      <p className="text-danger">
                        {formik.errors.user_password}
                      </p>
                    )}
                  {/* Forgot Password Link */}
                  <div className="text-end mt-2">
                    <Link
                      to={routes.auth.forgotPassword}
                      className="link fs-14 text-red"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Error Messages */}
                {/* {formik.errors.api && (
                  <p className="text-danger">{formik.errors.api}</p>
                )} */}

                {/* Submit Button */}
                <button type="submit" className="btn btn-login w-100 mt-4">
                  {formik.isSubmitting
                    ? "Logging in ..."
                    : authType === "otp"
                    ? "Request OTP"
                    : "Login"}
                </button>

                {/* Register Link */}
                <div className="text-center mt-3">
                  <p>
                    New to Jibooma?{" "}
                    <Link
                      to={routes.auth.register}
                      className="link ms-2 fs-16 text-red"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            ) : authType === "otp" ? (
              <form onSubmit={formik.handleSubmit}>
                {/* Mobile Input */}
                <div className="input-groups mb-4">
                  <label
                    htmlFor="user_mobile"
                    className="form-label text-white"
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="user_mobile"
                    name="user_mobile"
                    value={formik.values.user_mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.user_mobile && formik.errors.user_mobile && (
                    <p className="text-danger">{formik.errors.user_mobile}</p>
                  )}
                </div>

                {/* Error Messages */}
                {formik.errors.api && (
                  <p className="text-danger">{formik.errors.api}</p>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn btn-login w-100 mt-4">
                  {formik.isSubmitting
                    ? "Logging in ..."
                    : authType === "otp"
                    ? "Request OTP"
                    : "Login"}
                </button>

                {/* Register Link */}
                <div className="text-center mt-3">
                  <p>
                    New to Jibooma?{" "}
                    <Link to="/register" className="link ms-2 fs-16 text-red">
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            ) : authType === "static_otp" ? (
              <form onSubmit={formik.handleSubmit}>
                {/* Mobile Input */}
                <div className="input-groups mb-4">
                  <label
                    htmlFor="user_mobile"
                    className="form-label text-white"
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="user_mobile"
                    name="user_mobile"
                    value={formik.values.user_mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.user_mobile && formik.errors.user_mobile && (
                    <p className="text-danger">{formik.errors.user_mobile}</p>
                  )}
                </div>

                {/* Error Messages */}
                {formik.errors.api && (
                  <p className="text-danger">{formik.errors.api}</p>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn btn-login w-100 mt-4">
                  {formik.isSubmitting
                    ? "Logging in ..."
                    : authType === "otp"
                    ? "Request OTP"
                    : "Login"}
                </button>

                {/* Register Link */}
                <div className="text-center mt-3">
                  <p>
                    New to Jibooma?{" "}
                    <Link to="/register" className="link ms-2 fs-16 text-red">
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <p className="text-white">Invalid auth type: {authType}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
