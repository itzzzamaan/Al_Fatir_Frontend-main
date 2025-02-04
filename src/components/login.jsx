import { useState } from "react";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { LOGIN } from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`Field: ${name}, Value: ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(LOGIN, formData);
      console.log("API Response:", response.data);
  
      if (!response.data.error) {
        localStorage.setItem("Token", response.data.meta);
  
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred!");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="example@domain.com"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12"
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
          >
             {loading ? (
              <PropagateLoader size={10} color="#fff" />
             ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-gray-800 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
        <div className="flex items-center justify-between mt-6">
          <hr className="w-full border-gray-300" />
          <span className="text-gray-500 px-4">or</span>
          <hr className="w-full border-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Login;
