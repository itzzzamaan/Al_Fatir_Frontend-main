import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import { CUSTOMER,ADMIN_PROFILE } from "../config/api";
import { jwtDecode } from "jwt-decode";
import Footer from "./Footer";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    profile: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [customer, setCustomer] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const decodedToken = jwtDecode(token);
  console.log("Decoded token:", decodedToken);


// -------------------------role admin & customer---------------------
if (token) {
  try {
    const decodedToken = jwtDecode(token);
    role = decodedToken.claims?.role;

    if (!role) {
      throw new Error("Role is undefined in token claims");
    }

    if (role === "ADMIN") {
      console.log("Admin Access");
    } else if (role === "CUSTOMER") {
      console.log("User Access");
    } else {
      throw new Error("Invalid role found in token");
    }
  } catch (error) {
    console.error(`Error in inline role handling: ${error.message}`);
  }
}

//  ---------------customer profile---------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
    
        console.log("Customer ID:", decodedToken.claims.id);

        if (!decodedToken.claims.id) {
          throw new Error("Customer does not exist");
        }

        const response = await axios.get(CUSTOMER + decodedToken.claims.id);
        console.log("API Response:", response.data.meta);

        setCustomer(response.data.meta);
      } catch (error) {
        console.error("Error fetching Customer:", error);
      }
    };

    fetchProfile();
  }, []);

 

 

  
 
 
  const handleFileChange = async (e) => {
    const selectedImage = e.target.files[0]; 
    if (!selectedImage) {
      setError("Please select an image to upload.");
      return;
    }
    const handlePlaceOrder = () => {
      navigate("/resetpassword");
    };
  };
  return (
    <>
    <div className="min-h-screen relative flex flex-col lg:flex-col gap-12 justify-center bg-gray-50 p-4">
      <div className="absolute top-0 left-0">
        <img
          src="https://static.wixstatic.com/media/b6bc2e_c493cc0c078548fc806a9bb2610a061a~mv2.jpg/v1/fill/w_1583,h_446,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b6bc2e_c493cc0c078548fc806a9bb2610a061a~mv2.jpg "
          alt=""
          className=""
          style={{width:"100%"}}
        />
      </div>
      <div className="min-h-screen flex justify-center items-center p-6  ">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300"
        >
          <FaArrowLeft className="mr-2" />
        </button>
        <div
          className="w-full max-w-md  h-[400px] bg-gradient-to-r from-white to-black-500  rounded-lg shadow-lg p-6 z-10 backdrop-blur-sm "
          style={{ backgroundColor: "gradient" }}
        >
          {/* Loading state */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Profile Image or Loader */}
          <div className="flex justify-center mb-6 relative">
            <div className="relative">
              {loading ? (
                <div className="w-28 h-28 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <></>
              )}
              {/* <label className="absolute bottom-0 right-0 bg-black hover:bg-gray-400 p-2 rounded-full cursor-pointer ">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 13.5V8.25m-7.5 5.25V8.25m-3 12.75h16.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75v13.5A2.25 2.25 0 004.5 22.5z"
                />
              </svg>
            </label> */}
              {/* Profile Image */}
              <img
                src="user.png"
                alt="Avatar"
                className="rounded-full w-20 h-20 object-cover"
                style={{ mixBlendMode: "difference" }}
              />
            </div>
          </div>
          <div>
  <div className="block text-sm text-black-700">
    {customer ? (
      <div className="row">
        {decodedToken.claims.role === "CUSTOMER" ? (
          <div>
            {/* Customer Profile */}
            <p className="font-bold text-2xl text-capitalize text-center">
              {customer.firstName} {customer.lastName}
            </p>
            <div className="my-2">
              <p className="text-lg text-danger">Email:</p>
              <p>{customer.email}</p>
            </div>
            <div className="my-2">
              <p className="text-lg text-danger">Phone Number:</p>
              <p>{customer.phoneNumber}</p>
            </div>
          </div>
        ) : decodedToken.claims.role === "ADMIN" ? (
          <div>
            {/* Admin Profile */}
            <p className="font-bold text-2xl text-center text-uppercase">
              Admin: {customer.firstName} {customer.lastName}
            </p>
            <div className="my-2">
              <p className="text-lg text-danger">Email:</p>
              <p>{customer.email}</p>
            </div>
            <div className="my-2">
              <p className="text-lg text-danger">Admin Privileges:</p>
              <p>You have full access to manage users, data, and the platform.</p>
            </div>
          </div>
        ) : (
          <p className="text-center">Unknown role</p>
        )}
      </div>
    ) : (
      <p className="text-center">No profile data</p>
    )}
  </div>
</div>


              {/* Form Fields */}
              {/* <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <label className="block text-sm text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="firstName"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="lastName"
                disabled
              />
            </div>

       
            <div>
              <label className="block text-sm text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

          
            <div>
              <label className="block text-sm text-gray-700">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

          \
            <div>
              <label className="block text-sm text-gray-700">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Phone Number"
              />
            </div>

            
            <div>
              <button
                type="button"
                className="w-full p-3  text-black border border-black rounded-lg hover:text-white hover:bg-black"
                onClick={handlePlaceOrder}
              >
                Reset Password
              </button>
            </div>

          
            <div>
            <button
    type="submit"
    className="w-full p-3  text-black border border-black rounded-lg hover:text-white hover:bg-black"
>
    Update Profile
</button>

            </div>
          </form> */}
              {/* <button
                type="submit"
                className="w-full p-3  text-black border border-black rounded-lg hover:bg-black hover:text-white "
              >
                Update Profile
              </button> */}
             
            </div>
          </div>
        </div>
      
      
    
     <Footer/>
     </>

  );
};

export default Profile;
