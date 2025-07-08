// import axios from "axios";
// import BASE_URL from "../API/api";

// export const fetchDepositMethods = async (token) => {
//   if (!token) return { error: "No token provided" };

//   try {
//     const response = await axios.get(`${BASE_URL}/player/get-deposit-method`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (response.data.status === "success") {
//       return { data: response.data.paymentMethod || [] };
//     } else {
//       return { error: response.data.msg || "Failed to load deposit methods" };
//     }
//   } catch (error) {
//     return { error: "Something went wrong. Please try again." };
//   }
// };

// export const fetchPaymentDetails = async (token) => {
//   if (!token) return { error: "No token provided" };

//   try {
//     const response = await axios.get(`${BASE_URL}/player/get-payment-detail`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (response.data.status === "success") {
//       return { data: response.data.paymentDetails || "" };
//     } else {
//       return { error: response.data.msg || "Failed to load payment details" };
//     }
//   } catch (error) {
//     return { error: "Something went wrong. Please try again." };
//   }
// };
