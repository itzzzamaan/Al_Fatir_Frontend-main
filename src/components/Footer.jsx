import { useState } from "react";
import axios from "../utils/axios";
import { FaInstagram, FaCheckCircle } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        // Replace with your API endpoint
        const response = await axios.post("users/user/subscribe", { email });
        setMessage(
          <div className="flex items-center justify-center space-x-2 text-green-500">
            <FaCheckCircle /> {/* Green tick icon */}
            <span>Subscription successful!</span>
          </div>
        );
        setEmail(""); // Clear the input field after success
      } catch (error) {
        setMessage("Subscription failed. Please try again.");
      }
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <footer className="bg-black text-white p-12 md:py-12 ">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Get in Touch Section */}
        <div>
          <h3 className="text-lg font-semibold mb-10 cursive--font text-[40px]  md:text-[60px]">
            Get in Touch
          </h3>
          <p>
            15, Fatir Apparels & Perfumes, Shop no. 1, besides Rosy Dry
            Cleaners, Itwara Road, Bhopal, Madhya Pradesh 462001
          </p>
          <p className="mt-4">Mohammad Huzefa</p>
          <p>+91 88784 72152</p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Refund / Exchange / Return Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
