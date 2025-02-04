import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { ADDRESSES,CREATE_ORDER } from "../config/api";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
const Address = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice;

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleAddressSelect = (addr) => {
    console.log(addr.id)
    setSelectedAddressId(addr.id);
  };


  // Fetch addresses from API

  const fetchAddresses = async () => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;

        const response = await axios.get(`${ADDRESSES}/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract the addresses array from the meta object
        setAddresses(response.data?.meta?.addresses || []);
      } catch (error) {
        toast.error("Failed to fetch addresses");
      }
    } else {
      toast.error("No token found. Please login again.");
    }
  };


  const deleteAddress = async (addressId) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;

        // Make the DELETE request to remove the address
        const response = await axios.delete(`${ADDRESSES}/${addressId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Handle the response (e.g., update the state to remove the deleted address)
          setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
          toast.success("Address deleted successfully.");
        }
      } catch (error) {
        toast.error("Failed to delete address.");
      }
    } else {
      toast.error("No token found. Please login again.");
    }
  };


  // const handleAddressSelect = (selectedAddress) => {
  //   setSelectedAddressId(selectedAddress.id);
  //   setAddress(selectedAddress.street);
  //   setCity(selectedAddress.city);
  //   setState(selectedAddress.state);
  //   setPostalCode(selectedAddress.postalCode);
  //   setCountry(selectedAddress.country);
  //   setIsSelecting(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("Token");
    if (!address || !city || !state || !postalCode || !country) {
      toast.error("All fields are required.");
      return;
    }

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;

        const addressData = {
          street: address,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
          default: true,
        };

        const response = await axios.post(
          `${ADDRESSES}/${customerId}`,
          addressData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Address added successfully!");
        fetchAddresses();
        toggleAddressSelection();
      } catch (error) {
        toast.error("Failed to add address");
      }
    } else {
      toast.error("No token found. Please login again.");
    }
  };

  const toggleAddressSelection = () => {
    setIsSelecting(!isSelecting);
    if (!isSelecting) {
      fetchAddresses();
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMakePurchase = async () => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;
  
        const response = await axios.post(
          `${CREATE_ORDER}?customerId=${customerId}&addressId=${selectedAddressId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          toast.success('Order placed successfully');
          if (response.data.paymentLink) {
            window.location.href = response.data.paymentLink;
          } else {
            toast.error('Payment link not found');
          }
        }
      } catch (error) {
        toast.error(`Error creating order: ${error.message}`);
      }
    }
  };
  

  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row" style={{ marginTop: "55px" }}>
          <div className="col-md-8 mb-4">
            <div className="card mb-4 shadow border-0">
              <div className="card-header bg-black text-white py-3">
                <h5 className="mb-0">Billing Details *</h5>
              </div>
              <div className="card-body">
                {isSelecting ? (
                  <div>
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="companyName">
                        Address
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        className="form-control"
                        placeholder="Enter address"
                        style={{
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                            City
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            placeholder="Enter city"
                            style={{
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="lastName">
                            State
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            placeholder="Enter State name"
                            style={{
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                            Pin code
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            placeholder="Enter pincode"
                            style={{
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="lastName">
                            Country
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            placeholder="Enter country"
                            style={{
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-black btn-md btn-block"
                      onClick={handleSubmit}
                    >
                      Create Address
                    </button>
                  </div>


                ) : (
                  <div>
                    {addresses.length === 0 ? (
                      <p>No saved addresses found. Add one now.</p>
                    ) : (
                      <div
                        style={{
                          maxHeight: "300px",
                          overflowY: "auto",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          padding: "10px",
                        }}
                      >
                        {Array.isArray(addresses) && addresses.map((addr) => (
                          <div
                            className={`card mb-3 ${selectedAddressId === addr.id ? "border-primary" : ""}`}
                            key={addr.id}
                          >
                            <a
                              href={`/address/${addr.id}`}
                              className="text-decoration-none text-dark"
                              style={{ display: "block", textDecoration: "none" }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddressSelect(addr); // Call function to handle address selection
                              }}
                            >
                              <div className="card-body">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <h5 className="card-title">{addr.street}</h5>
                                  <FaTrashAlt
                                    onClick={() => deleteAddress(addr.id)}
                                    style={{
                                      color: "red",
                                      cursor: "pointer",
                                      fontSize: "18px",
                                    }}
                                  />
                                </div>
                                <p>
                                  {addr.city}, {addr.state}, {addr.postalCode}, {addr.country}
                                </p>
                              </div>
                            </a>
                          </div>
                        ))}

                      </div>
                    )}
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>

                  <span
                    style={{
                      cursor: "pointer",
                      color: "#000",
                      fontWeight: 'bold',
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={toggleAddressSelection}
                  >
                    {isSelecting ? "Select Address" : "Add New Address"}
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    ></i>
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Summary */}
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0">
              <div className="card-header bg-black text-white py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>₹ {formattedTotalPrice}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total Amount</strong>
                      <p className="mb-0 text-muted">(including VAT)</p>
                    </div>
                    <span>
                      <strong>₹ {formattedTotalPrice}</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={handleMakePurchase}
                  className="btn btn-black btn-lg btn-block"
                >
                  Make Purchase
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "30px",
              width: "90%",
              maxWidth: "450px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "15px",
                color: "#333",
              }}
            >
              Confirm Your Order
            </div>
            <p style={{ color: "#555", fontSize: "1rem", marginBottom: "25px" }}>
              Are you sure you want to confirm this order? Once confirmed, you won’t
              be able to modify it.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
              <button
                style={{
                  padding: "10px 25px",
                  backgroundColor: "#ff4d4d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "10px 25px",
                  backgroundColor: "#28a745",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={closeModal}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Address;
