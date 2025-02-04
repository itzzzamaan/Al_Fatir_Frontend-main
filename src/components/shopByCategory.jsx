import React, { useState } from 'react';
import axios from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ShopByCategory = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);




  return (
    <section className="bg-gray-50 scroll py-16 text-center">
      <h2 className="text-3xl sm:text-4xl mb-8 text-gray-800 font-semibold">Shop by Category</h2>
    
    </section>
  );
};

export default ShopByCategory;
