import React, { useState, useContext, useEffect, useRef } from "react";

import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import SuccessModal from "./SuccessModal";

// import {
//   ALL_PRODUCT,
//   CARTITEMS,
//   CUSTOMER,
//   DELETE_CARTITEMS,
//   QUANTITY,
//   ORDER_PLACED,
//   ADD_ADDRESS,
//   ADDRESSES,
//   UPDATE_ADDRESS,
//   DELETE_ADDRESS,
// } from "../config/api";
import { jwtDecode } from "jwt-decode";
import Header from "./Header";
import Footer from "./Footer";
import { set } from "react-hook-form";

const viewcart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  console.log(cartItems);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isFieldVisible, setIsFieldVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [city, setcity] = useState("");
  const [addressData, setAddressData] = useState([]);
  // console.log(addressData.length);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [address, setAddress] = useState("");
  console.log(addressData);
  const [landmark, setlandmark] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    console.log(`Selected Address ID: ${addressId}`); // Use this ID for further actions
  };

  // Handle Add Address button click to toggle visibility of address cards
  const handleAddAddressClick = () => {
    setIsFieldVisible(!isFieldVisible); // Toggle visibility
    if (!isFieldVisible) {
      fetchAddressData(); // Fetch addresses only if cards are going to be shown
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const toggleField = () => {
    setIsFieldVisible(!isFieldVisible);
  };
  const toggleFieldAdd = () => {
    setIsFieldVisible(!isFieldVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addressData);
  };

  // ------------payload-----------------

  const payload = {
    address,
    landmark,
    state,
    city,
    pincode,
  };

  console.log("Payload:", payload);
  const token = localStorage.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const fetchCartData = async () => {
    console.log(CARTITEMS + decodedToken.claims.id);
    try {
      const response = await axios.get(CARTITEMS + decodedToken.claims.id);
      console.log(response.data);
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `${DELETE_CARTITEMS}${decodedToken.claims.id}/${productId}`
      );
      fetchCartData();
      console.log("Deleted item:", response.data);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleQuantityChange = async (productId, quantity) => {
    console.log(productId, quantity, "gwhdg");
    console.log(
      `${QUANTITY}/${decodedToken.claims.id}/${productId}?quantity=${quantity}`,
      "how you doin?"
    );
    setCartItems((prevProducts) =>
      prevProducts
        .map((items) => {
          console.log("id", items.productId);
          if (items.productId === productId) {
            console.log("idjhsdc", productId);
            const updatedQuantity = quantity;
            if (updatedQuantity <= 0) return null;

            return { ...items, quantity: updatedQuantity };
          }
          return items;
        })
        .filter((items) => items !== null)
    );

    try {
      const response = await axios.put(
        `${QUANTITY}/${decodedToken.claims.id}/${productId}?quantity=${quantity}`
      );
      console.log(response, "hi");
      fetchCartData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // ----------add address---------------
  // payload
  //   const [address, setAddress] = useState({
  //   phone: "",
  //   country: "",
  //   address: "",
  //   city: "",
  //   region: "",
  //   pincode: "",
  // });
  const handleCheckout = async () => {
   
    try {
      const response = await axios.post(
        `${ADD_ADDRESS}${decodedToken.claims.id}`,
        payload,
      
      );
      console.log("hello", response.data);
      console.log("Address added successfully");
      alert("address added successfully");
     
     
    } catch (error) {
      console.error("Error adding Address:", error);
      alert("Error adding Address. Please try again later.");
    }
  };

  const fetchAddressData = async () => {
    console.log(GET_ADDRESS + decodedToken.claims.id);
    try {
      const response = await axios.get(GET_ADDRESS + decodedToken.claims.id);
      setAddressData(response.data.meta);
      console.log(setAddressData);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    fetchAddressData();
  }, []);

  // -----------place order---------------------
  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        `${ORDER_PLACED}?customerId=${decodedToken.claims.id}&addressId=${selectedAddressId}`,
        { cartItems }
      );
      console.log(response.data);
      console.log("Your order has been placed successfully");
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again later.");
    }
  };
  // --------------------------ADRESS UPDATE-------------------
  // try {
  //   const response = await axios.put(UPDATE_ADDRESS,{}

  //   );
  //   console.log(response, "hi");
  //   fetchCartData();
  // } catch (error) {
  //   console.error("Error updating data:", error);

  // }

  return (
    <div>
      <Header />
      <div className="container my-5" style={{ minHeight: "70vh" }}>
        {cartItems.length > 0 ? (
          <div className="row d-flex justify-content-center mt-5">
            {/* Cart Items Section */}
            <div className="col-lg-6 mb-4 my-5">
              <h4
                className="font-bold mb-4 mt-5 cursive--font"
                style={{ fontSize: "20px" }}
              >
                My Cart
              </h4>
              <div className="row">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item d-flex align-items-center justify-content-between mb-4 p-3 border rounded"
                  >
                    <img
                      src={item.filePath}
                      alt={item.productName}
                      className="rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                      }}
                    />
                    <div className="item-info ml-3">
                      <h5 className="mb-1">{item.productName}</h5>
                      <p className="mb-1 text-muted">Size: {item.size}</p>
                      <p className="font-weight-bold">₹{item.productPrice}</p>
                    </div>
                    <div className="quantity-control d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm mx-auto"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="form-control mx-2 text-center"
                        style={{ width: "80px" }}
                      />
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>

                      <div className="ms-5 font-bold">
                        Total: ₹{item.totalProductPrice}
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm mx-2"
                      onClick={() => handleDelete(item.productId)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="col-lg-3 my-5">
              <h4
                className="font-bold mb-4 my-5 cursive--font"
                style={{ fontSize: "20px" }}
              >
                Order Summary
              </h4>
              <div className="border p-4 rounded">
                <p className="d-flex justify-content-between my-2">
                  {/* <span>Subtotal</span> */}
                  {/* <span>
                    ₹
                    {cartItems.reduce(
                      (total, item) => total + item.totalProductPrice,
                      0
                    )}
                  </span> */}
                </p>
                <p className="d-flex justify-content-between my-2">
                  <span>Delivery Charges</span>
                  <span>{"Free"}</span>
                </p>
                <hr />
                <h5 className="d-flex justify-content-between font-bold my-2">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </h5>
                <p className="mt-2">Tax included</p>

                {/* ---------add address----------------- */}

                <button
                      onClick={handleAddAddressClick}
                      className="btn btn-block my-4 rounded-0 w-full"
                      disabled={loading}
                      style={{ backgroundColor: "#9F2747", color: "#fff" }}
                    >
                      {loading ? "Loading..." : "Add Address"}
                    </button>
              </div>
            </div>
            <div className="border-2 col-lg-8 col-md-10 col-sm-12">
                  {/* Add Address Button */}

                  {/* AMAAN  s */}

                  <div className="">
                  

                    {isFieldVisible && (
                      <div className="address-cards mt-4">
                        <h2>Choose a Delivery Address</h2>
                        <div className="">
                        <button
                          className="btn btn rounded-0 my-2 justify-content-center"
                          style={{ backgroundColor: "#000", color: "#fff" }}
                          onClick={toggleField}
                        >
                          Add Address
                        </button>
                       </div>
                        {isFieldVisible && (
                          <div className="col-lg-8 border p-3 d-flex justify-content-center">
                            <form
                              className="w-full max-w-lg"
                              onSubmit={handleSubmit}
                            >
                              <div className="hidden-field">
                                <h1 className="my-2 font-bold fs-3 cursive--font">
                                  Delivery Details
                                </h1>
                                <label htmlFor="address">Address</label>
                                <input
                                  type="text"
                                  id="address"
                                  name="address"
                                  required
                                  onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                                  placeholder="Enter text here"
                                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                                />

                                <label htmlFor="city">Landmark</label>
                                <input
                                  type="text"
                                  id="landmark"
                                  name="landmark"
                                  onChange={(e) => {
                                    setlandmark(e.target.value);
                                  }}
                                  required
                                  placeholder="Enter text here"
                                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                                />
                                <label htmlFor="city">City</label>
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  onChange={(e) => {
                                    setcity(e.target.value);
                                  }}
                                  required
                                  placeholder="Enter text here"
                                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                                />
                                <label htmlFor="zip">State</label>
                                <input
                                  type="text"
                                  id="state"
                                  name="state"
                                  required
                                  onChange={(e) => {
                                    setstate(e.target.value);
                                  }}
                                  placeholder="Enter text here"
                                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                                />
                                <label htmlFor="zip">Zip Code</label>
                                <input
                                  type="text"
                                  id="pincode"
                                  name="pincode"
                                  onChange={(e) => {
                                    setpincode(e.target.value);
                                  }}
                                  required
                                  placeholder="Enter text here"
                                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 focus:outline-none focus:bg-white"
                                />
                                {/* --------------------place order button------- */}
                                <button
                                  type="submit"
                                  className="btn rounded-0"
                                  style={{
                                    backgroundColor: "#000",
                                    color: "#fff",
                                  }}
                                  isFieldVisible ={false}
                                  onClick={handleCheckout}
                                >
                                  Save & Continue
                                </button>
                              </div>
                            </form>
                          </div>
                        )}

                        <div className="row">
                     
                          {/* If no addresses are available, show a message with a card */}
                          {addressData.length === 0 ? (
                            <div className="card mt-2">
                              <div className="card-body">
                                <h5 className="card-title">
                                  No Address Available
                                </h5>
                                <p className="card-text">
                                  You can add a new address by clicking the
                                  button above.
                                </p>
                              </div>
                            </div>
                            
                          ) : (
                            // Display available addresses in cards
                            addressData.map((address) => (
                              <div className="col-lg-4 col-md-6 col-sm-12">
                              <div
                                key={address.id}
                                className={`card m-2 rounded-0 shadow-sm${
                                  selectedAddressId === address.id
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() => handleAddressSelect(address.id)}
                                style={{
                                  cursor: "pointer",
                                  border:
                                    selectedAddressId === address.id
                                      ? "2px solid #9F2747"
                                      : "1px solid #ddd",
                                }}
                              >
                              
                                <div className="card-body">
                                  {/* <h5 className="card-title">
                                    Address {address.id}
                                  </h5> */}
                                  <p className="card-text">
                                    <strong>Address:</strong>{" "}
                                    {address.address || "Not provided"}
                                  </p>
                                  <p className="card-text">
                                    <strong>Landmark:</strong>{" "}
                                    {address.landmark || "Not provided"}
                                  </p>
                                  <p className="card-text">
                                    <strong>City:</strong>{" "}
                                    {address.city || "Not provided"}
                                  </p>
                                  <p className="card-text">
                                    <strong>State:</strong>{" "}
                                    {address.state || "Not provided"}
                                  </p>
                                  <p className="card-text">
                                    <strong>Zip Code:</strong>{" "}
                                    {address.pincode || "Not provided"}
                                  </p>
                                </div>
                              </div>
                       </div>
                            ))
                          )}
                     
                        </div>
                      </div>
                    )}

                    {/* Optionally, display selected address details */}
                    {selectedAddressId && (
                      <div className="selected-address-details mt-4 ">
                        <h3>Selected Address</h3>
                        <p>
                          <strong>Address:</strong>{" "}
                          {
                            addressData.find(
                              (addr) => addr.id === selectedAddressId
                            )?.address
                          }
                        </p>
                        <p>
                          <strong>Landmark:</strong>{" "}
                          {
                            addressData.find(
                              (addr) => addr.id === selectedAddressId
                            )?.landmark
                          }
                        </p>
                        <p>
                          <strong>City:</strong>{" "}
                          {
                            addressData.find(
                              (addr) => addr.id === selectedAddressId
                            )?.city
                          }
                        </p>
                        <p>
                          <strong>State:</strong>{" "}
                          {
                            addressData.find(
                              (addr) => addr.id === selectedAddressId
                            )?.state
                          }
                        </p>
                        <p>
                          <strong>Zip Code:</strong>{" "}
                          {
                            addressData.find(
                              (addr) => addr.id === selectedAddressId
                            )?.pincode
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  {/* AMAAN  e */}
                </div>
                {/* -----------------address form------------------------------------------ */}

                {/* --------------------------place order------------------------------- */}
               <div className="col-lg-6 ">
                <button
                  onClick={handlePlaceOrder}
                  className="btn btn btn-block mt-4 rounded-0 "
                  disabled={loading}
                  style={{ backgroundColor: "#9F2747", color: "#fff" }}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
                <p className="text-center my-2">
                  <i className="fa-solid fa-lock mx-2"></i>Secure Checkout
                </p>
                </div>
          </div>
        ) : (
          <div
            className="container my-5 border-2"
            style={{ minHeight: "70vh" }}
          >
            <div
              className="row d-flex justify-content-center align-items-center mt-5"
              style={{ height: "100%" }}
            >
              <div className="col-lg-5 mb-4 my-2 text-center">
                <img
                  src="cart-img2.jpg"
                  className="img-fluid"
                  style={{ height: "271px", margin: "0 auto" }}
                  alt="Cart is empty"
                />
                <p className="text-center fs-4 cursive--font">CART IS EMPTY!</p>
                <p
                  className="text-center text-decoration-underline cursor-pointer"
                  onClick={() => navigate("/all-products")}
                >
                  Continue browsing to add products to your cart!
                </p>
              </div>
            </div>
          </div>
        )}

        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={closeSuccessModal}
          message="Your order has been placed successfully. Thank you for shopping with us!"
        />
      </div>
      <Footer className="mb-0" />
    </div>
  );
};

export default viewcart;
