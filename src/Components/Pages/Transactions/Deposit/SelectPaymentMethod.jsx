import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../../Auth/AuthContext";
import axios from "axios";
import BASE_URL from "../../../../API/api";
// import routes from "../../../routes/route";
// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  getDepositMethods,
  getPaymentDetails,
} from "../../../../API/depositAPI";
import { verifyToken } from "../../../../API/authAPI";

const SelectPaymentMethod = ({
  paymentSelectedMethod,
  setPaymentSelectedMethod,
}) => {
  // console.log("selectedMethod", paymentSelectedMethod);

  const [depositMethod, setDepositMethod] = useState([]); // Payment methods
  const [selectedMethod, setSelectedMethod] = useState(null); // Selected method ID
  const [paymentDetails, setPaymentDetails] = useState(null); // Payment details from API
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const [copied3, setCopied3] = useState(false);
  const [copied4, setCopied4] = useState(false);
  const [copied5, setCopied5] = useState(false);

  // const navigate = useNavigate();
  // const handleCopy = (ref, setCopied) => {
  //   if (ref.current) {
  //     navigator.clipboard.writeText(ref.current.value);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   }
  // };
  const handleCopy = (ref, setCopied) => {
    if (ref.current) {
      const textToCopy = ref.current.value;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.error("Clipboard API failed", err);
            toast.error("Copy failed. Try manually.");
          });
      } else {
        try {
          // ✅ Create a temporary textarea for fallback
          const textarea = document.createElement("textarea");
          textarea.value = textToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);

          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          toast.error("Copy not supported in this browser.");
        }
      }
    }
  };

  const { user } = useContext(AuthContext);
  const token = user?.token;

  // Fetch deposit methods

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const verifyRes = await verifyToken(token);
        if (verifyRes.status !== "success") {
          setError("Invalid or expired token. Please log in again.");
          return;
        }

        const methodRes = await getDepositMethods(token);
        if (methodRes.status === "success") {
          setDepositMethod(methodRes.paymentMethod || []);
        } else {
          setError(methodRes.msg || "Failed to load payment methods");
        }
      } catch (err) {
        setError(
          "Something went wrong while verifying token or fetching methods."
        );
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (depositMethod.length > 0 && !selectedMethod) {
      const firstMethodId = depositMethod[0].id;
      setSelectedMethod(firstMethodId); // ✅ set default selected method
      fetchPaymentDetails(firstMethodId); // ✅ fetch its details
    }
  }, [depositMethod]);
  // useEffect(() => {
  //   const fetchDepositMethods = async () => {
  //     if (!token) return;

  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL}/player/get-deposit-method`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       if (response.data.status === "success") {
  //         setDepositMethod(response.data.paymentMethod || []);
  //       } else {
  //         setError(response.data.msg || "Failed to load payment methods");
  //       }
  //     } catch (err) {
  //       setError("Something went wrong. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDepositMethods();
  // }, [token]);

  // Fetch payment details based on method selection

  const fetchPaymentDetails = async (methodId) => {
    if (!token) return;

    setSelectedMethod(methodId); // Update selected method
    setPaymentSelectedMethod(methodId);
    setLoading(true);

    try {
      const verifyRes = await verifyToken(token);

      if (verifyRes.status !== "success") {
        setError("Invalid or expired token. Please log in again.");
        return;
      }

      // const response = await axios.get(
      //   `${BASE_URL}/player/get-payment-detail`,
      //   {
      //     params: { payment_method_id: methodId }, // <-- Pass data as query parameters
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );

      const getPayment = await getPaymentDetails(token, methodId);

      if (getPayment.status === "success") {
        setPaymentDetails(getPayment.paymentDetails); // Store payment details
        console.log(getPayment.paymentDetails);
      } else {
        setError(getPayment.msg || "Failed to load payment details");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // const fetchPaymentDetails = async (methodId) => {
  //   if (!token) return;

  //   setSelectedMethod(methodId); // Update selected method
  //   setPaymentSelectedMethod(methodId);
  //   setLoading(true);

  //   try {
  //     const response = await axios.get(
  //       `${BASE_URL}/player/get-payment-detail`,
  //       {
  //         params: { payment_method_id: methodId }, // <-- Pass data as query parameters
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (response.data.status === "success") {
  //       setPaymentDetails(response.data.paymentDetail); // Store payment details
  //       console.log(response.data.paymentDetail);
  //     } else {
  //       setError(response.data.msg || "Failed to load payment details");
  //     }
  //   } catch (err) {
  //     setError("Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div className=" bg_light_grey rounded-2  py-3">
      <div className="mx-3">
        <h5 className="mb-3">Select Payment Method</h5>

        {loading && <p>Loading payment methods...</p>}
        {error && <p className="text-danger">{error}</p>}

        {depositMethod.length === 0 && !loading && !error && (
          <p>No payment methods available.</p>
        )}
        {/* Bootstrap Tab Navigation */}
        {depositMethod.length > 0 && !loading && !error && (
          <nav className="nav nav-pills d-flex justify-content-between tab_red_active">
            {depositMethod.map((method) => (
              <button
                key={method.id}
                className={`nav-link btn-color text-white w-150 ${
                  selectedMethod === method.id ? "active" : ""
                }`}
                onClick={() => {
                  fetchPaymentDetails(method.id);
                  toast.success(
                    `Selected payment method: ${
                      method.id === 1 ? "BANK" : "UPI"
                    }`
                  );
                }}
                id={`tab-${method.id}`}
                data-bs-toggle="tab"
                data-bs-target={`#content-${method.id}`} // Bootstrap tab switching
                type="button"
                role="tab"
                aria-controls={`content-${method.id}`}
                aria-selected={selectedMethod === method.id ? "true" : "false"}
              >
                <img
                  src="assets/img/icons/icons8-deposit-64.png"
                  alt="deposit"
                  width="30px"
                />
                {method.name}
                {method.id}
              </button>
            ))}
          </nav>
        )}
      </div>
      <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="success-toaster my-3"
        />
      </div>
      {/* Bootstrap Tab Content */}
      <div className="tab-content mt-3" id="myTabContent">
        {depositMethod.map((method) => (
          <div
            key={method.id}
            className={`tab-pane fade ${
              selectedMethod === method.id ? "show active" : ""
            }`}
            id={`content-${method.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${method.id}`}
          >
            {/* Payment Details */}
            {/* {selectedMethod === method.id && paymentDetails && (
      <div className="card bg_light_grey account_input-textbox-container">
        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
          <h5 className="text-center mb-0">
            Payment Details for{" "}
            {paymentDetails.payment_method_name}
          </h5>
        </div>
        <div className="card-body">
          <pre className="text-white">
            {JSON.stringify(paymentDetails, null, 2)}
          </pre>
        </div>
      </div>
    )} */}

            {/* <p>{paymentDetails?.bank_name}</p> */}
            {/* Bank Details (Only for Bank) */}
            {selectedMethod === 1 && paymentDetails && (
              // paymentDetails.length > 0 &&
              <>
                <div className="card account_input-textbox-container border-0">
                  {/* <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Bank Details</h5>
                        </div> */}
                  <div className="card-body pt-0 py-0">
                    <h5 className="text-center mb-0">Bank Details</h5>
                    <div className="form-control_container">
                      <div className="input-field mb-3">
                        <input
                          required
                          className="input"
                          type="text"
                          value={paymentDetails?.bank_name}
                          readOnly
                          ref={inputRef1}
                          disabled
                        />
                        <div
                          className="position-absolute copy-text"
                          style={{
                            right: "10px",
                            top: "60%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          <button
                            onClick={() => handleCopy(inputRef1, setCopied1)}
                          >
                            <i className="fa-solid fa-copy text-white fs-5"></i>
                          </button>
                          {copied1 && (
                            <span className="copied-tooltip">Copied</span>
                          )}
                        </div>
                      </div>
                      <div className="input-field mb-3">
                        <input
                          required
                          className="input"
                          type="text"
                          value={paymentDetails.account_holder_name}
                          readOnly
                          ref={inputRef2}
                          disabled
                        />
                        <div
                          className="position-absolute copy-text"
                          style={{
                            right: "10px",
                            top: "60%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          <button
                            onClick={() => handleCopy(inputRef2, setCopied2)}
                          >
                            <i className="fa-solid fa-copy text-white fs-5"></i>
                          </button>
                          {copied2 && (
                            <span className="copied-tooltip">Copied</span>
                          )}
                        </div>
                      </div>
                      <div className="input-field mb-3">
                        <input
                          required
                          className="input"
                          type="text"
                          value={paymentDetails.account_number}
                          readOnly
                          ref={inputRef3}
                          disabled
                        />
                        <div
                          className="position-absolute copy-text"
                          style={{
                            right: "10px",
                            top: "60%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          <button
                            onClick={() => handleCopy(inputRef3, setCopied3)}
                          >
                            <i className="fa-solid fa-copy text-white fs-5"></i>
                          </button>
                          {copied3 && (
                            <span className="copied-tooltip">Copied</span>
                          )}
                        </div>
                      </div>
                      <div className="input-field mb-3">
                        <input
                          required
                          className="input"
                          type="text"
                          value={paymentDetails.ifsc_code}
                          readOnly
                          ref={inputRef4}
                          disabled
                        />
                        <div
                          className="position-absolute copy-text"
                          style={{
                            right: "10px",
                            top: "60%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          <button
                            onClick={() => handleCopy(inputRef4, setCopied4)}
                          >
                            <i className="fa-solid fa-copy text-white fs-5"></i>
                          </button>
                          {copied4 && (
                            <span className="copied-tooltip">Copied</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-login w-100 mt-4 mb-3 text-capitalize"
                          >
                            Select the Payment Method
                          </button>
                        </div> */}
                  </div>
                </div>
                {/* {paymentDetails.map((item, index) => (
                    <div
                      key={index}
                      className="card account_input-textbox-container border-0"
                    >
                      
                      <div className="card-body pt-0 py-0">
                        <h5 className="text-center mb-0">Bank Details</h5>
                        <div className="form-control_container">
                          <div className="input-field mb-3">
                            <input
                              required
                              className="input"
                              type="text"
                              value={item.bank_name}
                              readOnly
                              ref={inputRef1}
                              disabled
                            />
                            <div
                              className="position-absolute copy-text"
                              style={{
                                right: "10px",
                                top: "60%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                              }}
                            >
                              <button
                                onClick={() =>
                                  handleCopy(inputRef1, setCopied1)
                                }
                              >
                                <i className="fa-solid fa-copy text-white fs-5"></i>
                              </button>
                              {copied1 && (
                                <span className="copied-tooltip">Copied</span>
                              )}
                            </div>
                          </div>
                          <div className="input-field mb-3">
                            <input
                              required
                              className="input"
                              type="text"
                              value={item.account_holder_name}
                              readOnly
                              ref={inputRef2}
                              disabled
                            />
                            <div
                              className="position-absolute copy-text"
                              style={{
                                right: "10px",
                                top: "60%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                              }}
                            >
                              <button
                                onClick={() =>
                                  handleCopy(inputRef2, setCopied2)
                                }
                              >
                                <i className="fa-solid fa-copy text-white fs-5"></i>
                              </button>
                              {copied2 && (
                                <span className="copied-tooltip">Copied</span>
                              )}
                            </div>
                          </div>
                          <div className="input-field mb-3">
                            <input
                              required
                              className="input"
                              type="text"
                              value={item.account_number}
                              readOnly
                              ref={inputRef3}
                              disabled
                            />
                            <div
                              className="position-absolute copy-text"
                              style={{
                                right: "10px",
                                top: "60%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                              }}
                            >
                              <button
                                onClick={() =>
                                  handleCopy(inputRef3, setCopied3)
                                }
                              >
                                <i className="fa-solid fa-copy text-white fs-5"></i>
                              </button>
                              {copied3 && (
                                <span className="copied-tooltip">Copied</span>
                              )}
                            </div>
                          </div>
                          <div className="input-field mb-3">
                            <input
                              required
                              className="input"
                              type="text"
                              value={item.ifsc_code}
                              readOnly
                              ref={inputRef4}
                              disabled
                            />
                            <div
                              className="position-absolute copy-text"
                              style={{
                                right: "10px",
                                top: "60%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                              }}
                            >
                              <button
                                onClick={() =>
                                  handleCopy(inputRef4, setCopied4)
                                }
                              >
                                <i className="fa-solid fa-copy text-white fs-5"></i>
                              </button>
                              {copied4 && (
                                <span className="copied-tooltip">Copied</span>
                              )}
                            </div>
                          </div>
                        </div>

                      
                      </div>
                    </div>
                  ))} */}

                {/* // Rules Starts here */}
                <div>
                  {/* <div className="border-1 border-top mb-3 opacity-25"></div>
                    <div className="card bg-transparent account_input-textbox-container mt-0 mb-0 border-0">
                      <div className="card-body py-0">
                        <h6 className="mb-2">Rules</h6>
                        <ul className="list-unstyled mb-0">
                          <li className="text-white fs-14 mb-2">
                            <img
                              src="assets/img/icons/tick.png"
                              alt="tick"
                              width="20px"
                              className="me-2"
                            />
                            Transfer the amount through our safe payment gateway
                          </li>
                          <li className="text-white fs-14 mb-2">
                            <img
                              src="assets/img/icons/tick.png"
                              alt="tick"
                              width="20px"
                              className="me-2"
                            />
                            The amount will be deposited to your account
                            instantly
                          </li>
                          <li className="text-white fs-14 mb-2">
                            <img
                              src="assets/img/icons/tick.png"
                              alt="tick"
                              width="20px"
                              className="me-2"
                            />
                            Transfer the amount through our safe payment gateway
                          </li>
                          <li className="text-white fs-14 mb-2">
                            <img
                              src="assets/img/icons/tick.png"
                              alt="tick"
                              width="20px"
                              className="me-2"
                            />
                            Transfer the amount through our safe payment gateway
                          </li>
                        </ul>
                      </div>
                    </div> */}
                </div>
                {/* // Rules Ends here */}
              </>
            )}

            {/* UPI Details (Only for UPI) */}
            {selectedMethod === 2 && (
              <>
                {loading ? (
                  <div className="text-center py-4 text-white">
                    Loading UPI details...
                  </div>
                ) : paymentDetails ? (
                  <>
                    <div className="card bg_light_grey account_input-textbox-container mt-3 border-0">
                      <div className="card-body pt-0">
                        <h5 className="text-center mb-2">
                          UPI Payment Details{" "}
                          {/* {paymentDetails?.is_best_pick && (
                            <span className="badge bg-success">Best Pick</span>
                          )} */}
                        </h5>

                        {/* QR Code */}
                        <div className="d-flex justify-content-center mb-0">
                          {paymentDetails?.qr_code ? (
                            <img
                              src={`/${paymentDetails?.qr_code}`}
                              className="w-50"
                              alt="QR Code"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          ) : (
                            <div className="text-muted">No QR Code</div>
                          )}
                        </div>

                        {/* UPI ID */}
                        <div className="form-control_container">
                          <div className="input-field">
                            <input
                              className="input"
                              type="text"
                              value={paymentDetails?.upi_id || ""}
                              readOnly
                              disabled
                              ref={inputRef5}
                            />
                            <div
                              className="position-absolute copy-text"
                              style={{
                                right: "10px",
                                top: "60%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                              }}
                            >
                              <button
                                onClick={() =>
                                  handleCopy(inputRef5, setCopied5)
                                }
                              >
                                <i className="fa-solid fa-copy text-white fs-5"></i>
                              </button>
                              {copied5 && (
                                <span className="copied-tooltip">Copied</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Optional Extra Info */}
                        {paymentDetails?.account_holder_name && (
                          <p className="mt-2 text-white text-center">
                            Account Holder:{" "}
                            {paymentDetails?.account_holder_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-warning">
                    No UPI details found
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
