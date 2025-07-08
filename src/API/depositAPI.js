// src/API/depositAPI.js

import axios from "axios";
import BASE_URL from "./api";
import axiosInstance from "./axiosConfig";

// get the deposit payment method
export const getDepositMethods = async (token) => {
  const response = await axiosInstance.get("/player/get-deposit-method", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// get the Admin payment details
export const getPaymentDetails = async (token, methodId) => {
  const response = await axiosInstance.get("/player/get-payment-detail", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      payment_method_id: methodId,
    },
  });
  return response.data;
};

// Send the Deposit Request
export const sendDepositRequest = async ({
  token,
  amount,
  utr_number,
  payment_screenshot,
  paymentSelectedMethod,
}) => {
  // console.log("paymentSelectedMethod", paymentSelectedMethod);

  const formData = new FormData();
  formData.append("payment_detail_id", paymentSelectedMethod);
  formData.append("amount", amount);
  formData.append("utr", utr_number);

  if (payment_screenshot) {
    formData.append("image", payment_screenshot);
  }

  const response = await axios.post(
    `${BASE_URL}/player/send-deposit-request`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// deposit History
export const depositHistory = async (token) => {
  const response = await axiosInstance.get("/player/deposit-history", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
