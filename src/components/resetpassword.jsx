import { useState } from 'react';
import axios from '../utils/axios'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messageResponse, setMessageResponse] = useState('');
  const navigate = useNavigate();

  // Extract the token from the cookie
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.put(`/users/user/resetpassword?token=${token}`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setMessageResponse(response.data.message);
      toast.success('Password reset successful.');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error resetting password. Please try again.';
      console.error('Reset password error:', error);
      toast.error(errorMessage);
    }
  };

  return (
    <>
    <div className="flex justify-center items-center h-screen ">
    <button 
                onClick={() => navigate(-1)} 
                className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
                <FaArrowLeft className="mr-2" />
                
            </button>
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
