import axiosInstance from "./axiosConfig";
import axios from "axios";
import BASE_URL from "./api"; // Ensure BASE_URL is correct
import { data } from "react-router-dom";
// import { data } from "react-router-dom";

// ✅ Fetch authentication types
export const fetchAuthTypes = async () => {
  try {

    const response = await axios.get(`${BASE_URL}/authentication-type`);
    // console.log(response.data);
    return response.data; // Example: { auth_types: ["mobile-pass", "otp", "static"] }

   
  } catch (error) {
    console.error("Error fetching auth types:", error);
    return { auth_types: [] }; // Return an empty array on error
  }
};

// ✅ Login API Call
export const loginUser = async (mobile, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    mobile,
    password,
  });
  return response.data;
};


// Verify otp
export const verifyOTP = async (mobile, otp,usertype) => {
  try {
    const response = await fetch(`${BASE_URL}/authentication-otp-verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp,type:usertype }),


    });

    // console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { status: "error", msg: "Failed to verify OTP" };
  }
};

// ✅ Register API Call
export const registerUser = async (name, mobile, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/register`,
      { player_name: name, mobile, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // ✅ Return the full API response
  } catch (error) {
    console.error("Register API error:", error.response?.data); // ✅ Log full API error
    throw error; // ✅ Throw the full error object
  }
};

// ✅ Get User Profile
export const getUserProfile = async (token) => {
  try {
    const response = await axiosInstance.get("/player/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      return response.data.player; // ✅ Return only player data
    } else {
      throw new Error(response.data.msg || "Failed to load profile");
    }
  } catch (error) {
    console.error("Profile API Error:", error);
    throw new Error("Something went wrong. Please try again.");
  }
};

// ✅ Logout API Call
export const logoutUser = async () => {
  const response = await axiosInstance.post("/player/logout");
  return response.data;
};
