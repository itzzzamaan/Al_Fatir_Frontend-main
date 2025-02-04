import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Razorpay from 'razorpay';

const CreateOrder = () => {
  const [products, setProducts] = useState([{ product: '', quantity: 1 }]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle product change
  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  // Add a new product input
  const addProductField = () => {
    setProducts([...products, { product: '', quantity: 1 }]);
  };

  // Remove a product input
  const removeProductField = (index) => {
    setProducts(products.filter((_, idx) => idx !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the request payload
      const payload = {
        products: products.map(p => ({
          product: p.product,
          quantity: p.quantity,
        })),
        deliveryAddress,
        userEmail,
      };

      // Hit the backend API to create an order
      const response = await axios.post('/api/orders', payload);

      // Extract Razorpay order details from response
      const { razorpayOrderId, totalAmount } = response.data;

      // Call Razorpay for payment (optional)
      await initiateRazorpayPayment(razorpayOrderId, totalAmount);

      toast.success('Order created successfully.');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order.');
    } finally {
      setLoading(false);
    }
  };

  // Initiate Razorpay payment (optional)
  const initiateRazorpayPayment = async (razorpayOrderId, amount) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Replace with Razorpay key
      amount: amount * 100, // Razorpay amount in paise
      currency: 'INR',
      order_id: razorpayOrderId,
      name: 'Your Store Name',
      description: 'Order Payment',
      handler: (response) => {
        console.log('Payment successful:', response);
        toast.success('Payment successful.');
      },
      prefill: {
        email: userEmail,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="create-order-page p-4">
      <h1 className="text-3xl font-bold mb-4">Create Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="product-group">
            <label className="block text-gray-700 mb-2">Product {index + 1}</label>
            <input
              type="text"
              name="product"
              value={product.product}
              onChange={(e) => handleProductChange(index, 'product', e.target.value)}
              placeholder="Product ID"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
              placeholder="Quantity"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="button"
              onClick={() => removeProductField(index)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addProductField} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Another Product
        </button>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">Delivery Address</label>
          <textarea
            name="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? 'Creating Order...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
