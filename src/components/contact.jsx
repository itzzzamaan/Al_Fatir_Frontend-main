/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "./Header";
import { FaArrowLeft } from "react-icons/fa";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import WhatsappBtn from "./WhatsappBtn";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/users/user/contacts/message",
        formData
      );
      alert("Form submitted successfully!");
      console.log(response.data);

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        comment: "",
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Form submission failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen relative flex flex-col lg:flex-col gap-12 justify-center bg-gray-50 p-4">
        <div className="absolute top-0 left-0">
          <img
            src="https://static.wixstatic.com/media/b6bc2e_c493cc0c078548fc806a9bb2610a061a~mv2.jpg/v1/fill/w_1583,h_446,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b6bc2e_c493cc0c078548fc806a9bb2610a061a~mv2.jpg"
            alt=""
          />
        </div>
        <div className="max-w-4xl mx-auto bg-white p-10 mt-32  z-[100] flex gap-6 w-full md:min-h-[26rem] border-b-[2px] border-black/90 flex-col md:flex-row">
          <div className="w-full space-y-12 ">
            <h1 className="text-3xl cursive--font md:text-5xl font-semibold">
              Hello from Fatir
            </h1>
            <p className="text-secondary">
              Are you a person with questions, Then {"let's"} hear it from you
            </p>
            <div className="flex  justify-start gap-6 w-full cursive--font">
              <div className="flex flex-col">
                <span>Phone</span>
                <span className="text-secondary text-sm">+91-8878472152</span>
              </div>
              <div className="flex flex-col">
                <span>Email</span>
                <span className="text-secondary text-sm">
                  fatirapparelsandperfumes@gmail.com
                </span>
              </div>
            </div>
          </div>
          <div className="w-full space-y-12">
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border border-black px-2 py-1"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border border-black px-2 py-1"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-4">
                  <label htmlFor="email" className="text-sm mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-black px-2 py-1"
                    required
                  />
                </div>

                <div className="flex flex-col mt-4">
                  <label htmlFor="message" className="text-sm mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border border-black px-2 py-1 h-24"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-[#8C2331] text-white py-2 font-semibold"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-12 max-w-4xl mx-auto bg-white mb-4 ">
          <h1 className="text-4xl font-semibold mb-4 cursive--font">
            Visit Us
          </h1>
          <p className="text-base text-secondary mb-6">
            This is your Contact section paragraph. Encourage your reader to
            reach out with any questions, comments, or to take a different
            action specific to your site. You can also click on the contact form
            to customize the fields.
          </p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 cursive--font">
              Address
            </h2>
            <p className="text-md text-base text-secondary">
              15, Fatir Apparels & Perfumes, Shop no. 1, <br />
              besides Rosy Dry Cleaners, Itwara Road, <br />
              Bhopal, Madhya Pradesh 462001
            </p>
          </div>

          <div className="cursive--font ">
            <h2 className="text-xl font-semibold mb-2 cursive--font">
              Opening Hours
            </h2>
            <ul className="text-md">
              <li className="mb-1">
                <strong>Mon - Fri:</strong> 10:00 am – 9:00 pm
              </li>
              <li className="mb-1">
                <strong>Saturday:</strong> 10:00 am – 9:00 pm
              </li>
              <li>
                <strong>Sunday:</strong> CLOSED
              </li>
            </ul>
          </div>
        </div>
      </div>
      <WhatsappBtn/>
      <Footer />
    </>
  );
};

export default Contact;
