import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { checkPlayerName, getAuthType, registerUser } from "../../API/authAPI";
import AuthContext from "../../Auth/AuthContext";
import routes from "../routes/route";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Navigation function
  const [authType, setAuthType] = useState(null); // 👈 Store type here
  const [loading, setLoading] = useState(true); // 👈 To wait until API response

  useEffect(() => {
    // if the token is there then navigate to the home
    const token = localStorage.getItem("token");
    if (token) {
      navigate(routes.home);
    }
    // 👇 Fetch the authentication type from your API
    const fetchAuthType = async () => {
      try {
        const res = await getAuthType(); // e.g., returns { type: "default" }
        // console.log(res);
        setAuthType(res.type);
      } catch (err) {
        console.error("Failed to get auth type", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthType();
  }, [navigate]);

  //   Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Name is required")
      .test("unique-username", "Checking...", async function (value) {
        if (!value) return false;

        try {
          const res = await checkPlayerName(value);

          if (res.status === "success") return true;

          return this.createError({
            message: res.msg || "Username already taken",
          });
        } catch (err) {
          // ✅ Handle 409 error gracefully
          const message =
            err?.response?.data?.msg ||
            "Something went wrong while checking name.";
          return this.createError({ message });
        }
      }),

    mobile: Yup.string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number") //   Enforce exactly 11 digits
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    agreement: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const otpValidationSchema = Yup.object({
    username: Yup.string()
      .required("Name is required")
      .test("unique-username", "Checking...", async function (value) {
        if (!value) return false;

        try {
          const res = await checkPlayerName(value);

          if (res.status === "success") return true;

          return this.createError({
            message: res.msg || "Username already taken",
          });
        } catch (err) {
          // ✅ Handle 409 error gracefully
          const message =
            err?.response?.data?.msg ||
            "Something went wrong while checking name.";
          return this.createError({ message });
        }
      }),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
      .required("Mobile number is required"),
    agreement: Yup.boolean().oneOf([true], "You must accept the terms"),
  });
  const handleRegister = async (values, { setSubmitting }) => {
    setErrorMessage(""); // Reset previous errors

    try {
      if (authType === "default") {
        // ✅ Call the registerUser function (returns full response)
        const data = await registerUser(
          values.username,
          values.mobile,
          values.password
        );

        // console.log(data);

        if (data.status === "success") {
          alert(data.msg || "Registration successful!");
          localStorage.setItem("token", data.token);
          login(data.token); //  ✨ Update global auth state
          // navigate(routes.home); //  ✨ Redirect after login
          navigate(routes.home); // ✅ for programmatic redirects
        } else {
          setErrorMessage(data.msg || "Registration failed."); // ✅ Show API error message
        }
      } else if (authType === "otp") {
        // ✅ Call the registerUser function (returns full response)
        const data = await registerUser(values.username, values.mobile);

        if (data.status === "success") {
          alert(data.msg || "Registration successful!");
          localStorage.setItem("token", data.token);
          login(data.token); //  ✨ Update global auth state
          navigate(routes.auth.verifyOTP, {
            state: {
              player_name: values.username,
              mobile: values.mobile,
              type: "login", // or "login"
              authType,
            },
          }); // ✅ for programmatic redirects
        } else {
          setErrorMessage(data.msg || "Registration failed."); // ✅ Show API error message
        }
      } else if (authType === "static_otp") {
        const data = await registerUser(values.username, values.mobile);
        // console.log(data);

        if (data.status === "success") {
          alert(data.msg || "Registration successful!");

          navigate(routes.auth.verifyOTP, {
            state: {
              mobile: values.mobile,
              type: "register",
              otp: data.otp, // 👈 pass static OTP to Verify page,
            },
          });
        } else {
          setErrorMessage(data.msg || "Registration failed.");
        }
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        setErrorMessage(error.response.data.msg); // ✅ Show error from API
      } else if (error.response?.data?.errors) {
        const validationErrors = Object.values(error.response.data.errors)
          .flat()
          .join(" ");
        // console.log("Setting Validation error:", validationErrors);
        setErrorMessage(validationErrors); // ✅ Show validation errors
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-white text-center mt-5">Loading...</p>;
  return (
    <section className="container">
      <div className="pt-3 pb-2">
        {/* Logo */}
        <div className="logo d-flex justify-content-center mb-2">
          <img src="assets/img/fav.png" alt="Logo" width="75%" />
        </div>

        <div className="p-3">
          {/* Heading */}
          <div className="py-2">
            <h3 className="title">Register</h3>
            <p className="text-white">Create your account to get started.</p>
          </div>

          {authType === "default" ? (
            <>
              {/*   Register Form */}
              <Formik
                initialValues={{
                  name: "",
                  mobile: "",
                  password: "",
                  confirmPassword: "",
                  agreement: false,
                }}
                validationSchema={validationSchema}
                validateOnChange={false} // only validate on blur or submit
                onSubmit={handleRegister}
              >
                {({ isSubmitting }) => (
                  <Form className="login-form">
                    {/* Show API Error Message */}
                    {errorMessage && (
                      <p className="text-danger">{errorMessage}</p>
                    )}

                    {/*   Username Input */}
                    <div className="input-groups mb-4">
                      <label
                        htmlFor="username"
                        className="form-label text-white"
                      >
                        Username
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="error text-danger"
                      />
                    </div>

                    {/*   Mobile Number Input */}
                    <div className="input-groups mb-4">
                      <label htmlFor="mobile" className="form-label text-white">
                        Mobile No
                      </label>
                      <Field
                        type="tel"
                        className="form-control"
                        id="mobile"
                        name="mobile"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="error text-danger"
                      />
                    </div>

                    {/*   Password Input */}
                    <div className="input-groups mb-4">
                      <label
                        htmlFor="password"
                        className="form-label text-white"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error text-danger"
                      />
                    </div>

                    {/*   Confirm Password Input */}
                    <div className="input-groups mb-4 position-relative">
                      <label
                        htmlFor="confirmPassword"
                        className="form-label text-white"
                      >
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="error text-danger"
                      />
                    </div>

                    {/*   Agreement Checkbox */}
                    <div className="mb-3 form-check">
                      <Field
                        type="checkbox"
                        className="form-check-input"
                        id="agreement"
                        name="agreement"
                      />
                      <label
                        className="form-check-label text-secondary mt-1 px-1"
                        htmlFor="agreement"
                      >
                        I agree to the User Agreement & confirm I am at least 18
                        years old
                      </label>
                      <ErrorMessage
                        name="agreement"
                        component="div"
                        className="error text-danger"
                      />
                    </div>

                    {/*   Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-login w-100 my-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing up..." : "Sign up"}
                      <i className="ri-expand-right-line text-white fs-20 ms-2" />
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          ) : authType === "otp" ? (
            <Formik
              initialValues={{
                name: "",
                mobile: "",
                agreement: false,
              }}
              validationSchema={otpValidationSchema}
              onSubmit={handleRegister}
            >
              {({ isSubmitting }) => (
                <Form className="login-form">
                  {/* Show API Error Message */}
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}

                  {/*   Username Input */}
                  <div className="input-groups mb-4">
                    <label htmlFor="username" className="form-label text-white">
                      Username
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error text-danger"
                    />
                  </div>

                  {/*   Mobile Number Input */}
                  <div className="input-groups mb-4">
                    <label htmlFor="mobile" className="form-label text-white">
                      Mobile No
                    </label>
                    <Field
                      type="tel"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  {/*   Agreement Checkbox */}
                  <div className="mb-3 form-check">
                    <Field
                      type="checkbox"
                      className="form-check-input"
                      id="agreement"
                      name="agreement"
                    />
                    <label
                      className="form-check-label text-secondary mt-1 px-1"
                      htmlFor="agreement"
                    >
                      I agree to the User Agreement & confirm I am at least 18
                      years old
                    </label>
                    <ErrorMessage
                      name="agreement"
                      component="div"
                      className="error text-danger"
                    />
                  </div>

                  {/*   Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-login w-100 my-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing up..." : "Sign up"}
                    <i className="ri-expand-right-line text-white fs-20 ms-2" />
                  </button>
                </Form>
              )}
            </Formik>
          ) : authType === "static_otp" ? (
            <Formik
              initialValues={{
                name: "",
                mobile: "",
                agreement: false,
              }}
              validationSchema={otpValidationSchema}
              onSubmit={handleRegister}
            >
              {({ isSubmitting }) => (
                <Form className="login-form">
                  {/* Show API Error Message */}
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}

                  {/*   Username Input */}
                  <div className="input-groups mb-4">
                    <label htmlFor="username" className="form-label text-white">
                      Username
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error text-danger"
                    />
                  </div>

                  {/*   Mobile Number Input */}
                  <div className="input-groups mb-4">
                    <label htmlFor="mobile" className="form-label text-white">
                      Mobile No
                    </label>
                    <Field
                      type="tel"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="error text-danger"
                    />
                  </div>
                  {/*   Agreement Checkbox */}
                  <div className="mb-3 form-check">
                    <Field
                      type="checkbox"
                      className="form-check-input"
                      id="agreement"
                      name="agreement"
                    />
                    <label
                      className="form-check-label text-secondary mt-1 px-1"
                      htmlFor="agreement"
                    >
                      I agree to the User Agreement & confirm I am at least 18
                      years old
                    </label>
                    <ErrorMessage
                      name="agreement"
                      component="div"
                      className="error text-danger"
                    />
                  </div>

                  {/*   Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-login w-100 my-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing up..." : "Sign up"}
                    <i className="ri-expand-right-line text-white fs-20 ms-2" />
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <p className="text-white">Invalid auth type: {authType}</p>
          )}

          {/* Login Link */}
          <div className="text-center">
            <p>
              Already have an account?
              <span
                className="link ms-2 fs-16 text-red"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(routes.auth.login)}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="text-center bottom-0 w-100 my-5 start-0">
        <p className="text-white">
          By tapping Sign Up you accept our
          <span className="text-red fw-600"> Terms </span> and
          <span className="text-red fw-600"> Condition</span>
        </p>
      </div>
    </section>
  );
};

export default Register;
