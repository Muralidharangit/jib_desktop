import React, { useState } from "react";
// import AuthContext from "../../../Auth/AuthContext";
// import axios from "axios";
// import BASE_URL from "../../../API/api";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Footer from "../../layouts/footer/Footer";
import SelectAmount from "./SelectAmount";
import SelectPaymentMethod from "./SelectPaymentMethod";
import DepositAmountRequest from "./DepositAmountRequest";

function Deposit() {
  const [activeStep, setActiveStep] = useState("step1");
  const [selectedAmount, setSelectedAmount] = useState(""); // 🟣 Add this line
  const [paymentSelectedMethod, setPaymentSelectedMethod] = useState(""); // 🟣 Add this line
  const [depositFormData, setDepositFormData] = useState({
    amount: "", // selected in Step 1
    paymentSelectedMethod: "", // selected in Step 2
    utr_number: "",
    payment_screenshot: null,
  });
  const steps = [
    {
      id: "step1",
      icon: "fas fa-folder-open",
      title: "Step 1",
      content: () => (
        <SelectAmount amount={selectedAmount} setAmount={setSelectedAmount} />
      ),
    },
    {
      id: "step2",
      icon: "fas fa-briefcase",
      title: "Step 2",
      content: () => (
        <SelectPaymentMethod
          paymentSelectedMethod={paymentSelectedMethod}
          setPaymentSelectedMethod={setPaymentSelectedMethod}
        />
      ),
    },
    {
      id: "step3",
      icon: "fas fa-star",
      title: "Step 3",
      content: () => (
        <DepositAmountRequest
          amount={selectedAmount}
          paymentSelectedMethod={paymentSelectedMethod}
          formData={depositFormData}
          setFormData={setDepositFormData}
        />
      ), // 🟣 Pass amount here
    },
  ];

  const goNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };

  const goPrevious = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };
  return (
    <>
      <section className="container position-relative">
        <div className="h-100">
          <div className="pt-3 pb-2">
            <div className="row px-2">
              {/* header Starts */}
              <div className="d-flex align-items-center justify-content-between position-relative  px-0">
                {/* Back Button on Left */}
                <div className="d-flex justify-content-between align-items-center px-0">
                  <button
                    className="go_back_btn bg-grey"
                    onClick={() => window.history.back()}
                  >
                    <i className="ri-arrow-left-s-line text-white fs-20" />
                  </button>
                </div>

                {/* Centered Title */}
                <h5 className="position-absolute start-50 translate-middle-x m-0 text-white fs-16">
                  Deposit
                </h5>
              </div>
              {/* header Ends */}
              {/* <div className="d-flex justify-content-between align-items-center px-0">
                <button
                  className="go_back_btn"
                  onClick={() => window.history.back()}
                >
                  <i className="ri-arrow-left-s-line text-white fs-24" />
                </button>
              </div> */}

              {/* test Starts */}
              <div className="container mt-4 px-0">
                <div className="wizard my-5">
                  <ul className="nav nav-tabs justify-content-center">
                    {steps.map((step, index) => (
                      <li
                        key={step.id}
                        className="nav-item flex-fill"
                        role="presentation"
                      >
                        <span
                          className="text-white position-absolute start-50 translate-middle-x"
                          style={{ top: "-30px" }}
                        >
                          {step.title}
                        </span>

                        <a
                          className={`nav-link rounded-circle mx-auto d-flex align-items-center justify-content-center ${
                            activeStep === step.id ? "active" : ""
                          }`}
                          href={`#${step.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveStep(step.id);
                          }}
                        >
                          <i className={step.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Navigation Tabs */}
                  <div className="tab-content">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`tab-pane fade ${
                          activeStep === step.id ? "show active" : ""
                        }`}
                        id={step.id}
                      >
                        {/* <h5 className="mt-3">{step.title}</h5> */}
                        {step.content()} {/* ✅ FIX: Call the function */}
                        {/* <div className="d-flex justify-content-between">
                    {index > 0 && (
                      <button
                        className="btn btn-secondary previous"
                        onClick={goPrevious}
                      >
                        <i className="fas fa-angle-left"></i> Back
                      </button>
                    )}
                    {index < steps.length - 1 ? (
                      <button className="btn btn-info next" onClick={goNext}>
                        Continue <i className="fas fa-angle-right"></i>
                      </button>
                    ) : (
                      <button className="btn btn-info next">
                        Submit <i className="fas fa-angle-right"></i>
                      </button>
                    )}
                  </div> */}
                      </div>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="tab-content">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`tab-pane fade ${
                          activeStep === step.id ? "show active" : ""
                        }`}
                        id={step.id}
                      >
                        {/* <h3>{step.title}</h3> */}
                        <p>{step.content}</p>
                        <div className="d-flex justify-content-between">
                          {index > 0 && (
                            <button
                              className="btn btn-secondary previous"
                              onClick={goPrevious}
                            >
                              <i className="fas fa-angle-left"></i> Back
                            </button>
                          )}
                          {index < steps.length - 1 ? (
                            <button
                              className="btn btn-light next"
                              onClick={goNext}
                            >
                              Continue <i className="fas fa-angle-right"></i>
                            </button>
                          ) : (
                            ""
                            // <button className="btn bg-primary_color text-white next">
                            //   Submit <i className="fas fa-angle-right"></i>
                            // </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* test Ends */}
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Deposit;
