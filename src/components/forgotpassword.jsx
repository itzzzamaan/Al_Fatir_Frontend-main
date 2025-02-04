import React, { useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import Header from './Header';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendResetLink = async (email) => {
        try {
            const response = await axios.post('/users/user/forgotpassword', { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendResetLink(email);
            toast.success(`Password reset link has been sent to ${email}`);
            setEmail('');
            navigate('/login');
        } catch (error) {
            toast.error('An error occurred. Please try again.', { position: toast.POSITION.TOP_CENTER });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-gray-100 px-4">
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
                <FaArrowLeft className="mr-2" />
                Back
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Forgot Your Password?</h2>
                <p className="text-gray-600 mb-6 text-center">Enter your email address, and we will send you a link to reset your password.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="example@domain.com"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
                            loading ? 'bg-black' : 'bg-black hover:bg-black'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                        
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default ForgotPassword;