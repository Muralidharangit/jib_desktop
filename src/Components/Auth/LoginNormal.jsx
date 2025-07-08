import React, { useState } from "react";
import routes from "../routes/route";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../API/api";

const LoginPage = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    // https://staging.syscorp.in/api/jiboomba/login
    // password : password
    // Mobile : 99947283278

    // https://staging.syscorp.in/api/jiboomba/login
    try {
      const response = await axios.post(
        `${BASE_URL}/jiboomba/login`,
        { mobile, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      // console.log(response.data.token);
      // console.log(response.data);

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token); // Store token
        navigate(routes.home); // Redirect after login
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
    }
  };
  return (
    <>
      <section className="container vh-100 position-relative overflow-hidden">
        <div className="pt-3 pb-2 h-100">
          <div className="logo d-flex justify-content-center mb-2">
            <img src="assets/img/fav.png" alt="" className="" width="75%" />
          </div>
          <div className="p-3 h-100 d-flex justify-content-start flex-column">
            <div className="py-4 pt-0">
              <div className="section-head">
                <h3 className="title text-center text-uppercase"> Sign In</h3>
                {/* <p className="text-white">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Laborum, dolorem.
                </p> */}
              </div>
            </div>
            <div className="form">
              <div className="login-form mb-3">
                <form onSubmit={handleLogin}>
                  <div className="input-groups mb-4">
                    <label htmlFor="mobile" className="form-label text-white">
                      Mobile
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>

                  <div className="input-groups mb-4 position-relative">
                    <label htmlFor="password" className="form-label text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-danger">{error}</p>}

                  <Link to={routes.Forgotpassword}>
                    <p className="form-text text-end m-0 fs-15 text-red">
                      Forgot Password?
                    </p>
                  </Link>

                  <button
                    type="submit"
                    className="btn btn-login w-100 mt-5 mb-3"
                  >
                    Login{" "}
                    <i className="ri-expand-right-line text-white fs-20" />
                  </button>

                  <div className="text-center">
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
              </div>
            </div>
            {/* <div className="text-center  bottom-0 w-100 my-5 start-0">
              <div className="icon-social">
                <div className="d-flex justify-content-center  text-white fs-25 gap-3">
                  <i className="ri-facebook-fill" />
                  <i className="ri-instagram-line" />
                  <i className="ri-linkedin-box-line" />
                  <i className="ri-twitter-x-line" />
                  <i className="ri-youtube-line" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
