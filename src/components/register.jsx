import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  REGISTER_CUSTOMER 
} from "../config/api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(REGISTER_CUSTOMER, formData);

      if (response.data.error === false) {
        toast.success("User created successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.response);
      }
    } catch (error) {
      toast.error(error.response?.data?.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 p-8">
        <img
          src="https://static.wixstatic.com/media/b6bc2e_732da056164d4599a81afbea79686f36~mv2.png/v1/crop/x_0,y_64,w_500,h_371/fill/w_120,h_86,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png"
          alt="Logo"
          className="w-64 h-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome to Our Platform
        </h2>
        <p className="text-gray-600 text-center mt-4">
          Create your account to get started with our amazing services.
        </p>
      </div>

      <div className="bg-white p-5 md:p-12 rounded-lg shadow-lg w-full max-w-lg md:w-1/2">
        <h2 className="text-2xl font-bold text-black mb-2 text-center">
          Create Your Account
        </h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter first name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter last name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              maxLength={10}
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="example@domain.com"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 mt-8 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-gray-800 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
