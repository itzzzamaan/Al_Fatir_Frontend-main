import React, { useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // For navigation

const Input = ({ id, show, setshow, fetchProductData }) => {
  const [addReview, setAddReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const navigate = useNavigate();

  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    if (!token) {
      // If no token, show login popup
      setShowPopup(true);
      return;
    }

    if (addReview.trim() && rating > 0) {
      try {
        const response = await axios.post(
          `/products/add/review?token=${token}`,
          {
            comment: addReview,
            rating: rating, // Send rating to API
            productId: id,  // Assuming you pass productId as a prop
          }
        );
        console.log('Review submitted:', response.data);

        // Clear the input fields after submission
        setAddReview("");
        setRating(0); // Reset rating
        setshow(!show);
        fetchProductData();
      } catch (error) {
        console.error('Error submitting review:', error);
        if (error.response.data.message === "You have already reviewed this product") {
          toast.info("You've already reviewed this product.");
          setAddReview("");
          setRating(0);
          setshow(!show);
        }
      }
    } else {
      alert("Please enter a review and rating before submitting.");
    }
  };

  const redirectToLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="w-full px-4 sm:px-0 sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            onChange={(e) => setAddReview(e.target.value)}
            value={addReview}
            type="text"
            placeholder="Enter your review..."
            className="flex-1 w-full px-2 py-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-lg focus:outline-none shadow-md transition duration-300 ease-in-out"
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-transparent shadow-md transition duration-300 ease-in-out"
          >
            <option value="0" disabled>Rate 1-5</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-gray-100 text-black px-6 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ease-in-out shadow-md"
        >
          Submit
        </button>
      </form>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Please log in to submit a review.</p>
            <button
              onClick={redirectToLogin}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black border border-black"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Input;
