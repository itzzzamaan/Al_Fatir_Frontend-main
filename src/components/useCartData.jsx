import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useCartData = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const fetchCartData = async () => {
        try {
            const { data } = await axios.get(`/users/user/currentuser?token=${token}`);
            if (data && data.user.mycart) {
                setCart(data.user.mycart.length);
            } else {
                setCart(0);
            }
        } catch (err) {
            console.error('Error fetching cart data:', err);
            setError('Unable to fetch cart data. Please try again later.');
            setCart(0); // Fall back to empty cart in case of an error
        }
    };

    useEffect(() => {
        if (token) {
            fetchCartData();
        } else {
            setError('No token found');
        }
    }, [token]);

    return { cart, error };
};

export default useCartData;
