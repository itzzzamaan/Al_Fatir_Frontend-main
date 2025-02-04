import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Ensure axios is set up with the base URL
import { toast } from 'react-toastify';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      if (token) {
        try {
          // Fetch orders from the correct endpoint
          const response = await axios.get(`/orders/user?token=${token}`);
          setOrders(response.data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setError('Failed to load orders.');
          toast.error('Error fetching orders.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error('User is not authenticated.');
      }
    };

    fetchOrders();
  }, []);

  const generateInvoice = async (orderId) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        return;
      }

      // Request to generate invoice and download the PDF
      const response = await axios.get(`/invoices/invoice/${orderId}?token=${token}`, {
        responseType: 'blob' // Important to handle binary data
      });

      // Create a blob from the response and open it in a new tab
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      toast.success('Invoice generated successfully.');
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Failed to generate invoice.');
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="orders-container p-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border-b text-left">Order ID</th>
              <th className="py-2 border-b text-left">Total Price</th>
              <th className="py-2 border-b text-left">Products</th>
              <th className="py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="py-2 border-b">{order._id}</td>
                <td className="py-2 border-b">Rs. {order.totalPrice}</td>
                <td className="py-2 border-b">
                  {order.products.map(productItem => (
                    <div key={productItem.product._id}>
                      {productItem.product.name} (Qty: {productItem.quantity})
                    </div>
                  ))}
                </td>
                <td className="py-2 border-b">
                  <button
                    onClick={() => generateInvoice(order._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Download Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;
