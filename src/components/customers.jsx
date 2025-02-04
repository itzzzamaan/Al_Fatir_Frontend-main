import  { useState } from 'react';
import {
  FaHome,
  FaCartPlus,
  FaUser,
  FaBox,
  FaChartLine,
  FaCogs,
  FaTimes,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const customersPerPage = 10;

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen flex flex-col md:flex-row bg-gray-100">
        {/* Sidebar */}
        <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-6 transition-transform duration-300 ease-in-out z-10 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:w-64`}
      >
        <button
          className="absolute top-4 right-4 text-white md:hidden"
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
            <Link to="/customers" className="flex items-center space-x-2 hover:text-blue-300 transition">
              <FaUser />
              <span>Customers</span>
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
        <div className="flex-1 p-6 ">
          {/* <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            <FaArrowLeft className="mr-2" />
            
          </button> */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Customers</h2>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Customer Table */}
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.joinDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;

