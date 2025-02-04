import  { useState } from 'react';
import axios from '../utils/axios'; // Adjust the import path as needed
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

const UpdatePassword = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.put(
        `/users/user/updatepassword`,
        { password, confirmPassword, token }
      );

      console.log(response.data);
      toast.success('Your password has been updated successfully!');
      setPassword('');
      setConfirmPassword('');
      navigate('/'); // Redirect to home after successful password update
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Confirm your new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black hover:bg-black text-white font-bold py-3 rounded-lg transition-colors duration-300"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
