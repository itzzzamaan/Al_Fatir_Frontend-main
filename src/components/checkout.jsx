import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; 
import { useNavigate } from 'react-router-dom'; 

import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { useRazorpay ,RazorpayOrderOptions} from 'react-razorpay';


const Checkout = () => {

  const [addresses, setAddresses] = useState([]); 
  const [selectedAddress, setSelectedAddress] = useState(null); 
  const [newAddress, setNewAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',    
    phoneNumber: ''
  }); 
  const [cartDetails, setCartDetails] = useState({ items: [], totalAmount: 0 }); 
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({
    username: '',
    dob: '',
    gender: '',
    phonenumber: '',
    email: '',
    profile: ''
  });
  const [loading, setLoading] = useState(false);
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]; // Token from cookies
  const navigate = useNavigate();
  

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/users/user/profile?token=${token}`);
      setProfile(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        const response = await axios.get(`/users/user/checkout?token=${token}`);
        // console.log(response);
        const { cart, addresses } = response.data;
        setAddresses(addresses);
        setCartDetails({
          items: cart.items,
          totalAmount: cart.totalAmount,
        });


        if (addresses.length > 0) {
          setSelectedAddress(addresses[0]);
        }
      } catch (error) {
        setError('Failed to fetch checkout details');
      }
    };

    fetchCheckoutDetails();
  }, [token]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/users/user/checkout/add/address?token=${token}`, newAddress);
      setAddresses([...addresses, response.data.address]);
      setNewAddress({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
      });
      

      fetchCheckoutDetails();
    } catch (error) {
      setError('Failed to add new address');
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    // console.log(selectedAddress);
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const { isLoading, Razorpay } = useRazorpay();

  // const handlePlaceOrder = () => {
  //   if (!selectedAddress) {
  //     toast.error('Please select a delivery address.');
  //     return;
  //   }

  //   const options: RazorpayOrderOptions = {
  //     key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
  //     amount: cartDetails.totalAmount * 100,
  //     currency: "INR",
  //     name: 'Your Store Name',
  //     description: 'Order Payment',
  //     handler: async function (response) {
  //       console.log('Payment successful:', response);
  //       try {
  //         const orderConfirmation = await axios.post(`/order/confirm?token=${token}`, {
  //           paymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //           products: cartDetails.items.map((item) => ({
  //             product: { _id: item.product._id },
  //             quantity: item.quantity || 1,
  //           })),
  //           deliveryAddress: selectedAddress,
  //           userEmail: profile.email,
  //         });

  //         if (orderConfirmation.data.success) {
  //           toast.success('Payment successful and order confirmed.');
  //           navigate('/order-success');
  //         } else {
  //           toast.error('Order confirmation failed. Please contact support.');
  //         }
  //       } catch (error) {
  //         console.error('Error confirming order:', error);
  //         toast.error('Failed to confirm order. Please contact support.');
  //       }
  //     },
  //     prefill: {
  //       email: profile.email,
  //       contact: selectedAddress.phoneNumber || '', // Ensure phone number is coming from correct field
  //     },
  //     theme: {
  //       color: '#3399cc',
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address.');
      return;
    }
  
    // Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: cartDetails.totalAmount * 100, 
      currency: "INR",
      name: 'AL Fatir sdfghjklkgfdfghj',
      description: 'Order Payment',
      handler: async function (response) {
        console.log('Payment successful:', response);
  
        try {
          
          const orderConfirmation = await axios.post(`/order/create?token=${token}`, {
            products: cartDetails.items.map((item) => ({
              product: {
                _id: item.product._id,
                name: item.product.name, 
                priceAfterDiscount: item.product.priceAfterDiscount,
              },
              quantity: item.quantity || 1,
              _id: item._id || '', 
            })),
            deliveryAddress: {
              _id: selectedAddress._id || '', 
              addressLine1: selectedAddress.addressLine1,
              addressLine2: selectedAddress.addressLine2,
              city: selectedAddress.city,
              state: selectedAddress.state,
              postalCode: selectedAddress.postalCode,
              country: selectedAddress.country,
              phoneNumber: selectedAddress.phoneNumber,
            },
            userEmail: profile.email,
          });
  
          if (orderConfirmation.data) {
            toast.success('Payment successful and order confirmed.');
            console.log(orderConfirmation);
            navigate('/order');
          } else {
            toast.error('Order confirmation failed. Please contact support.');
            console.log(orderConfirmation);
          }
        } catch (error) {
          console.error('Error confirming order:', error);
          toast.error('Failed to confirm order. Please contact support.');
        }
      },
      prefill: {
        email: profile.email,
        contact: selectedAddress.phoneNumber || '', 
      },
      theme: {
        color: '#3399cc',
      },
    };
  
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  return (
    <>
      <div className="checkout-page p-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
          <FaArrowLeft className="mr-2" />
        </button>

        <div className="mb-6 mt-8">
          <h2 className="font-medium text-lg mb-4">Deliver to:</h2>

          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address._id}
                className={`address-card p-4 rounded-lg shadow-md border cursor-pointer mb-4 hover:shadow-lg transition-shadow duration-300 ${selectedAddress?._id === address._id ? 'border-black bg-white text-white' : 'border-gray-300'
                  }`}
                onClick={() => handleSelectAddress(address)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{address.name}</p>
                    <p className="text-sm text-gray-600">
                      {address.addressLine1}, {address.addressLine2}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state}, {address.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{address.country}</p>
                    <p className="text-sm text-gray-600">{address.phoneNumber}</p>
                  </div>

                  <div className="ml-4">
                    <span
                      className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedAddress?._id === address._id ? 'border-black bg-black' : 'border-gray-300'
                        }`}
                    >
                      {selectedAddress?._id === address._id && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No addresses found. Please add a new address below.</p>
          )}

          <div className="mt-4 p-4">
            <button
              className="text-black font-medium hover:underline"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {isFormVisible ? 'Cancel' : '+ Add Address'}
            </button>
          </div>

          {isFormVisible && (
            <form className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md" onSubmit={handleAddAddress}>
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Add New Address</h3>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={newAddress.addressLine1}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                  className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={newAddress.addressLine2}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                  className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newAddress.phoneNumber}
                  onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                  className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
                />
              </div>

              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
                Add Address
              </button>
            </form>
          )}
        </div>

        <div className="cart-summary mt-6 flex flex-col lg:flex-row gap-6">
          <div className="cart-items w-full lg:w-2/3 p-4 lg:p-6">
            {cartDetails.items.map((item) => (
              <div key={item.product._id}
                onClick={() => navigate(`/singleproduct/${item.product._id}`)} className="cart-item cursor-pointer flex items-center justify-between p-4 border-b hover:bg-gray-100 transition duration-300">
                <div className="w-1/4 md:w-1/6">
                  <img
                    src={item.product.images}
                    alt={item.product.name}
                    className="rounded-lg w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>

                <div onClick={() => navigate(`/singleproduct/${item.product._id}`)} className="w-2/3 md:w-1/2 px-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-400 line-through">{item.product.originalPrice}</p>
                  <p className="text-green-600 font-semibold">Final Price: {item.product.priceAfterDiscount}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary w-full lg:w-1/3 p-6 bg-white shadow-md rounded-lg">
            <h2 className="font-medium mb-4 text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-lg mb-2 text-gray-600">
              <p>Total Price:</p>
              <p>{cartDetails.totalAmount}</p>
            </div>
            <div className="flex justify-between text-lg mb-2 text-gray-600">
              <p>Platform Fee:</p>
              <p>10.00</p>
            </div>
            <div className="flex justify-between text-lg mb-2 text-gray-600">
              <p>Delivery Charges:</p>
              <p>5.00</p>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-4 text-gray-800">
              <p>Final Amount:</p>
              <p>{cartDetails.totalAmount}</p>
            </div>

            <button
              className="text-black border border-black rounded-lg hover:text-white hover:bg-black px-6 py-3 w-full transition duration-300 transform hover:scale-105"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default Checkout;
