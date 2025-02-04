import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Card = ({ image, route, productName, price }) => {

  const [showView, setShowView] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Select Size");
  const [quantityCount, setQuantityCount] = useState(0);

  function handleShowView() {
    setShowView((prev) => !prev);
  }
  const cardImageRef = useRef();
  useEffect(() => {
    gsap.from(cardImageRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.4,
    });
  }, [showView]);

  function handleSizeSelect(size) {
    setSelectedSize(size);
    setDropdownOpen(false);
  }

  function handleShowView() {
    setShowView((prev) => !prev);
  }

  function handleDropdownToggle() {
    setDropdownOpen((prev) => !prev);
  }

const handleCountDecrease = (quantityCount) => {
  if(quantityCount===0){
    return
  }
  else{
    setQuantityCount(quantityCount-1)
  }
}
  return (
    <div className=" w-[320px] h-auto m-2 mb-10 bg-white">
      <Link to={route} className="flex flex-col space-y-4">
        {/* <div
          className="w-full h-full relative overflow-hidden "
          onMouseEnter={handleShowView}
          onMouseLeave={handleShowView}
        >
          <img
            src={image}
            className={`w-full h-80 -z-10 duration-200 object-cover transition-all ${showView ? "scale-110" : ""}`}
            alt="product-card"
          />
          {showView && (
            <div
              ref={cardImageRef}
              className="bg-white/40 p-3 z-10 opacity-100 absolute bottom-0 w-full text-black text-center cursive--font text-xl capitalize"
            >
              quick view
            </div>
          )}
        </div> */}
        <div>
          <img src={image} alt="" className="object-cover h-[200px] w-full"/>
        </div>
        <div className="bg-white text-center font-[300]">
          <div className="text-2xl text-left font-semibold">{productName}</div>
          <div className="text-left">₹{price}</div>
          <div className="text-sm text-left">
            Taxes included <span className="underline">Free shipping</span>
          </div>

          {/* dropdown for perfume quantity */}
          <div>
            <form action="" className="flex flex-col gap-3">
              {/* <div className="flex justify-between mx-2 border-2 border-black">
                <div className="dropdown flex justify-between items-center w-full">
                  <div className="flex justify-between items-center w-full">
                    <div>{selectedSize}</div>
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn bg-white border-none"
                      onClick={handleDropdownToggle}
                    >
                      <MdOutlineKeyboardArrowDown />
                    </div>
                  </div>
                  {dropdownOpen && (
                    <ul className="dropdown-content menu bg-base-100 rounded z-[1] w-52 mt-5 p-2 shadow">
                      <li><a onClick={() => handleSizeSelect("Perfume 100ml")}>Perfume 100ml</a></li>
                      <li><a onClick={() => handleSizeSelect("Perfume 50ml")}>Perfume 50ml</a></li>
                      <li><a onClick={() => handleSizeSelect("Perfume 30ml")}>Perfume 30ml</a></li>
                    </ul>
                  )}
                </div>
              </div> */}
              <div className="flex border-2 justify-between items-center h-8 px-2">
                  <label htmlFor="">Select Size</label>
              </div>

              <div className="flex justify-between px-2 h-8 border-2 items-center">
                <div><button onClick={()=>handleCountDecrease(quantityCount)}>-</button></div>
                <div>{quantityCount}</div>
                <div><button onClick={()=>setQuantityCount(quantityCount+1)}>+</button></div>
              </div>

              <div>
                <button className="bg-black text-white px-4 py-2 w-full">Add To Cart</button>
              </div>
            </form>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;



//----------------------------------------------------




import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';
import Cookies from 'js-cookie';
import AdminContext from '../contexts/admincontext';

import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LOGIN } from '../config/api';
// import Header from './Header';


const Loginadmin = () => {
  const [adminisAuthenticated, setadminIsAuthenticated] = useContext(AdminContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const baseURl = LOGIN;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(LOGIN, {
        email: formData.email,
        password: formData.password,
      });
      console.log('Login successful:', response.data);
      Cookies.set('token', response.data.token, { expires: 1 / 24 });

      setadminIsAuthenticated(true);
      navigate('/admin');
    } catch (err) {

      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Email or password is incorrect. Please try again.');

      setTimeout(() => {
        setError(null);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  // google auth starts
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const data = jwtDecode(credentialResponse.credential);
      const response = await axios.post('admins/admin/google/login', {
        username: data.name,
        email: data.email,
        isAdmin: false
      });

      console.log('Google login successful:', response.data);

      Cookies.set('token', response.data.token, { expires: 1 / 24 });
      setadminIsAuthenticated(true);
      navigate('/admin');
    } catch (error) {
      console.error('Error during Google login:', error);
      setError('Google login failed. Please try again.');
    }
  };
  // google auth ends
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <>
      <div className="flex items-center justify-center h-full bg-gray-100 px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
          <FaArrowLeft className="mr-2" />

        </button>
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg md:shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 text-left">Admin Login </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email" // Updated to use "name" instead of "id"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="example@domain.com"
                disabled={loading}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password" // Updated to use "name" instead of "id"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12"
                placeholder="••••••••"
                disabled={loading}
              />
              <Link to="/forgotpassword" className="text-black hover:text-black text-sm font-medium transition-colors duration-300">
                Forgot Password?
              </Link>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 mt-8 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className={`w-full py-3 text-white rounded-lg mt-4 flex items-center justify-center transition-all duration-300 ${loading ? 'bg-black' : 'bg-black hover:bg-black'
                }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Don't have an account?{' '}
            <span onClick={() => navigate('/registeradmin')} className="text-black cursor-pointer">
              Register
            </span>
          </p>
          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-500 px-4">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
              setError('Google login failed. Please try again.');
            }}
          />
        </div>
      </div>
    </>

  );
};

export default Loginadmin;


//-------------------------------------------------

import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleDropdown1 = () => setIsDropdownOpen1(!isDropdownOpen1);
    const toggleDropdown2 = () => setIsDropdownOpen2(!isDropdownOpen2);
    const toggleDropdown3 = () => setIsDropdownOpen3(!isDropdownOpen3);
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        // Redirect to login or home page if needed
    };

    return (
        <div className="relative">
            {/* Sidebar Toggle Button */}
            <span
                className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
                onClick={toggleSidebar}
            >
                <i className={`bi ${isSidebarOpen ? 'bi-x' : 'bi-filter-left'} px-2 bg-black rounded-md`}></i>
            </span>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="p-4 h-screen w-[300px] bg-black text-white">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-xl font-bold">Al - Fatir</h1>
                        <i
                            className="bi bi-x cursor-pointer md:hidden"
                            onClick={toggleSidebar}
                        ></i>
                    </div>

                    <div className="my-2 bg-gray-600 h-px"></div>

                    {/* Shop By Fragrance Families */}
                    <div
                        className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                        onClick={toggleDropdown1}
                    >
                        <i className="bi bi-chat-left-text-fill"></i>
                        <div className="flex justify-between w-full items-center">
                            <span className="ml-4 font-bold">Shop By Fragrance Families</span>
                            <i className={`bi bi-chevron-down transition-transform ${isDropdownOpen1 ? 'rotate-180' : ''}`}></i>
                        </div>
                    </div>
                    {isDropdownOpen1 && (
                        <div className="mt-2 ml-8">
                            <Link to="/dashboard/fresh" className="block p-2 hover:bg-blue-600 rounded-md">Fresh</Link>
                            <Link to="/dashboard/floral" className="block p-2 hover:bg-blue-600 rounded-md">Floral</Link>
                            <Link to="/dashboard/fruity" className="block p-2 hover:bg-blue-600 rounded-md">Fruity</Link>
                            <Link to="/dashboard/oriental" className="block p-2 hover:bg-blue-600 rounded-md">Oriental</Link>
                            <Link to="/dashboard/woody" className="block p-2 hover:bg-blue-600 rounded-md">Woody</Link>
                        </div>
                    )}

                    {/* Shop By Categories */}
                    <div
                        className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                        onClick={toggleDropdown2}
                    >
                        <i className="bi bi-chat-left-text-fill"></i>
                        <div className="flex justify-between w-full items-center">
                            <span className="ml-4 font-bold">Shop By Categories</span>
                            <i className={`bi bi-chevron-down transition-transform ${isDropdownOpen2 ? 'rotate-180' : ''}`}></i>
                        </div>
                    </div>
                    {isDropdownOpen2 && (
                        <div className="mt-2 ml-8">
                            <Link to="/dashboard/attars" className="block p-2 hover:bg-blue-600 rounded-md">Attars (Concentrated Perfume Oils)</Link>
                            <Link to="/dashboard/perfumes" className="block p-2 hover:bg-blue-600 rounded-md">Perfumes (Eau de parfum)</Link>
                        </div>
                    )}

                    {/* Shop By Collections */}
                    <div
                        className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                        onClick={toggleDropdown3}
                    >
                        <i className="bi bi-chat-left-text-fill"></i>
                        <div className="flex justify-between w-full items-center">
                            <span className="ml-4 font-bold">Shop By Collections</span>
                            <i className={`bi bi-chevron-down transition-transform ${isDropdownOpen3 ? 'rotate-180' : ''}`}></i>
                        </div>
                    </div>
                    {isDropdownOpen3 && (
                        <div className="mt-2 ml-8">
                            <Link to="/dashboard/exclusive-fragrance-collection" className="block p-2 hover:bg-blue-600 rounded-md">Exclusive Fragrance Collection</Link>
                            <Link to="/dashboard/classic-fragrance-collection" className="block p-2 hover:bg-blue-600 rounded-md">Classic Fragrance Collection</Link>
                        </div>
                    )}

                    {/* Bakhur Link */}
                    <Link to="/dashboard/bakhur-admin" className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600">
                        <i className="bi bi-house-door-fill"></i>
                        <span className="ml-4 font-bold">Bakhur</span>
                    </Link>

                    {/* All Products Link */}
                    <Link to="/dashboard/all-products-admin" className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600">
                        <i className="bi bi-house-door-fill"></i>
                        <span className="ml-4 font-bold">All Products</span>
                    </Link>

                    {/* Logout Button */}
                    <div
                        className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span className="ml-4 font-bold">Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
