import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { GET_ORDER } from "../config/api";
import Header from './Header';
import Footer from './Footer';
import { format, isToday, isYesterday } from 'date-fns';
import { enIN } from 'date-fns/locale';

const SkeletonOrder = () => {
  return (
    <div className="border-b py-3 animate-pulse">
      <div className="flex flex-col lg:flex-row justify-between">
        <div>
          <div className="bg-gray-300 h-6 w-32 mb-2 rounded"></div>
          <div className="flex space-x-4 mt-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-300 w-20 h-20 rounded"></div>
            ))}
          </div>
          <div className="bg-gray-300 h-4 w-48 mt-2 rounded"></div>
        </div>
        <div className="text-left lg:text-right mt-4 lg:mt-0">
          <div className="bg-gray-300 h-4 w-24 mb-2 rounded"></div>
          <div className="bg-gray-300 h-10 w-32 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: null,
    time: null,
  });

  const navigate = useNavigate();

  const formatOrderDate = (orderDate) => {
    const date = new Date(orderDate);
    if (isToday(date)) {
      return 'Today';
    }
    if (isYesterday(date)) {
      return 'Yesterday';
    }
    return format(date, 'dd-MM-yyyy', { locale: enIN });
  };

  const token = localStorage.getItem("Token");
  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }
  const customerId = decodedToken?.claims?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (customerId) {
        try {
          const response = await axios.get(`${GET_ORDER}/${customerId}`);
          setOrders(response.data.meta.orderDetails);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setLoading(false);
        }
      } else {
        console.error("Customer ID not found.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  const applyFilters = (orders) => {
    return orders.filter((order) => {
      const matchesStatus = filters.status
        ? order.status === filters.status
        : true;
      const matchesTime = filters.time
        ? new Date(order.orderDate).getFullYear().toString() === filters.time
        : true;
      return matchesStatus && matchesTime;
    });
  };

  const filteredOrders = applyFilters(orders);

  return (
    <>
      <Header />
      <div className="w-full text-center py-2 bg-gray-100 shadow-md rounded-lg mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Orders</h2>
      </div>

      <div className="flex flex-col lg:flex-row mt-10 px-4 lg:px-0 gap-6">
        {/* Filters Section */}
        <div className="w-full lg:w-3/12 bg-white p-5 mt-10 shadow-xl rounded-lg mb-6 lg:mb-0 h-100">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>
          <div className="mb-4">
            <h4 className="font-semibold">Order Status</h4>
            {['On the way', 'Delivered', 'Cancelled', 'Returned'].map((status) => (
              <label key={status} className="block mt-2">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  className="mr-2"
                  onChange={() => setFilters((prev) => ({ ...prev, status }))}
                />
                {status}
              </label>
            ))}
          </div>
          {/* Order Time Filter */}
          <div>
            <h4 className="font-semibold">Order Time</h4>
            {['Last 30 days', '2023', '2022', '2021', '2020', 'Older'].map((time) => (
              <label key={time} className="block mt-2">
                <input
                  type="radio"
                  name="time"
                  value={time}
                  className="mr-2"
                  onChange={() => setFilters((prev) => ({ ...prev, time }))}
                />
                {time}
              </label>
            ))}
          </div>
        </div>

        {/* Orders Section */}
        <div className="w-full lg:w-8/12 bg-white p-6 shadow-xl rounded-lg">
          {loading ? (
            <div>
              {[...Array(3)].map((_, index) => (
                <SkeletonOrder key={index} />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center">
              <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold">No orders found</h2>
              <p>Try adjusting your filters or placing an order.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="border-b p-3 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => window.location.href = `/order_history/Details/${order.orderId}`}
              >
                <div className="flex flex-col lg:flex-row justify-between">
                  <div>
                    <h1 className="font-bold text-green-500">
                      {formatOrderDate(order.orderDate)}
                    </h1>
                    <h3 className="font-bold">Order #{order.orderId}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      {order.items.slice(0, 3).map((item) => (
                        <img
                          key={item.orderItemId}
                          src={item.variantDetails.bannerImage}
                          alt={item.variantDetails.product.productName}
                          className="w-20 h-20 object-cover rounded shadow-md"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-gray-500 font-semibold">...</span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <span key={item.orderItemId}>
                          {item.variantDetails.product.productName}
                          {index < Math.min(order.items.length, 3) - 1 && ', '}
                        </span>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-gray-500 font-semibold">...</span>
                      )}
                    </p>
                  </div>
                  <div className="text-left lg:text-right mt-4 lg:mt-0">
                    <p className="font-semibold">Total: Rs {order.totalPrice.toFixed(2)}</p>
                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                      <button className="mt-2 bg-black text-white hover:bg-white hover:text-black border border-black px-4 py-2 rounded-md shadow-md">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>

  );
};

export default Order;
