import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaCartPlus,
  FaUser,
  FaBox,
  FaChartLine,
  FaCogs,
  FaTimes,
  FaBars,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from '../utils/axios'; // Ensure the path to your axios instance is correct

const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true); // Set loading state to true when the fetch begins
    try {
        // Retrieve the token from cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        
        // Fetch reports data from the API
        const response = await axios.get(`/dashboard/generate/reports?token=${token}`); // Adjust your API endpoint accordingly

        // Check if the response indicates success
        if (response.data.success) {
            // Extracting the desired data structure
            const reportData = response.data.data; // Contains both reports and detailedReports

            // Assuming setData takes an object with reports and detailedReports
            setData(reportData);
            console.log(reportData); // Log the report data for debugging
        } else {
            setError('Failed to fetch reports data: ' + response.data.message);
        }
    } catch (err) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching reports:', err); // Log error for debugging
        setError('Failed to fetch reports data');
    } finally {
        // Set loading state to false when the fetch is complete
        setLoading(false);
    }
};

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-black text-white p-6 transition-transform duration-300 ease-in-out z-10 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-64`}
        >
          <button
            className="absolute top-4 right-4 text-black md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={24} />
          </button>
          <nav className="space-y-6">
            <ul className="space-y-4">
              <Link to="/admin" className="flex items-center space-x-2 hover:text-blue-300 transition">
                <FaHome />
                <span>Dashboard</span>
              </Link>
              <Link to="/orders" className="flex items-center space-x-2 hover:text-blue-300 transition">
                <FaCartPlus />
                <span>Orders</span>
              </Link>
              <Link to="/products" className="flex items-center space-x-2 hover:text-blue-300 transition">
                <FaBox />
                <span>Products</span>
              </Link>
              <Link to="/addproducts" className="flex items-center space-x-2 hover:text-blue-300 transition">
                <FaBox />
                <span>Add Products</span>
              </Link>
              <Link to="/reports" className="flex items-center space-x-2 hover:text-blue-300 transition">
                <FaChartLine />
                <span>Reports</span>
              </Link>
              <Link to="/admin/settings" className="flex items-center space-x-2 hover:text-blue-300 transition">
                <FaCogs />
                <span>Settings</span>
              </Link>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <button
            className="md:hidden text-gray-700 mb-4"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars size={24} />
          </button>

          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Reports</h2>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {/* Total Sales */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-lg font-medium text-gray-700">Total Sales</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-600">
                Rs {data.reports.totalSales.value.toFixed(2)}
              </p>
              <p className="mt-4 text-sm text-green-500">
                {data.reports.totalSales.growth}
              </p>
            </div>

            {/* Total Orders */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-lg font-medium text-gray-700">Total Orders</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-600">
                {data.reports.totalOrders.value}
              </p>
              <p className="mt-4 text-sm text-green-500">
                {data.reports.totalOrders.growth}
              </p>
            </div>

            {/* Total Customers */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-lg font-medium text-gray-700">Total Customers</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-600">
                {data.reports.totalCustomers.value}
              </p>
              <p className="mt-4 text-sm text-green-500">
                {data.reports.totalCustomers.growth}
              </p>
            </div>

            {/* Total Products */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-lg font-medium text-gray-700">Total Products</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-600">
                {data.reports.totalProducts}
              </p>
            </div>
          </div>

          {/* Detailed Reports */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Reports</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium text-gray-700">Monthly Sales</h4>
                <p className="mt-2 text-xl font-semibold text-blue-600">Rs {data.detailedReports.monthlySales.toFixed(2)}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium text-gray-700">Monthly Orders</h4>
                <p className="mt-2 text-xl font-semibold text-blue-600">{data.detailedReports.monthlyOrders}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium text-gray-700">New Customers</h4>
                <p className="mt-2 text-xl font-semibold text-blue-600">{data.detailedReports.newCustomers}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium text-gray-700">Repeat Customers</h4>
                <p className="mt-2 text-xl font-semibold text-blue-600">{data.detailedReports.repeatCustomersPercentage}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Reports;
