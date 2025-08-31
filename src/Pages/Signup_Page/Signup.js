import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSendOtp = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("https://exclusive-e-com-backend.onrender.com/api/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (response.data.message === "OTP sent to email") { // ✅ match backend message
      setOtpSent(true);
      setMessage("OTP sent to your email");
    } else {
      setMessage("Failed to send OTP");
    }
  } catch (error) {
    console.error(error);
    setMessage("Error sending OTP");
  }
};

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("https://exclusive-e-com-backend.onrender.com/api/auth/verify-otp", {
      email: formData.email,
      otp: otp,
    });

    if (response.data.message === "Email verified successfully") { // ✅ match backend message
      setMessage("OTP verified successfully");
    } else {
      setMessage("Failed to verify OTP");
    }
  } catch (error) {
    console.error(error);
    setMessage("Error verifying OTP");
  }
};


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 bg-gray-100 justify-center items-center">
        <img
          src="Images/SideImage.png"
          alt="Signup Illustration"
          className="max-w-full rounded-2xl p-2 shadow-lg"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
          <p className="text-gray-600 mb-6">Join us and enjoy exclusive benefits</p>

          {!otpSent ? (
            <form className="space-y-4" onSubmit={handleSendOtp}>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"

                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              {/* OTP Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP sent to your email"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Verify OTP & Sign Up
              </button>
            </form>
          )}

          {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}

          {/* Already have an account */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
