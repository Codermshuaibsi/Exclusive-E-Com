import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // ✅ stop page reload
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            console.log("Login response:", response.data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("Login successful ✅");
                window.location.href = "/";
               
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            alert("Invalid credentials ❌");
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Image */}
            <div className="hidden md:flex w-1/2 bg-gray-100 justify-center items-center">
                <img
                    src="Images/SideImage.png"
                    alt="Login Illustration"
                    className="max-w-full rounded-2xl p-2 shadow-lg"
                />
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
                <div className="max-w-md w-full">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Login to Your Account</h2>
                    <p className="text-gray-600 mb-6">Access your account securely</p>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"   // ✅ important
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"   // ✅ important
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Login {/* ✅ changed from "Sign Up" */}
                        </button>

                        {/* Redirect */}
                        <p className="text-sm text-gray-600 text-center">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-red-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
