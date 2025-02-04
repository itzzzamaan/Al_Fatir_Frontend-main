import React, { createContext, useContext, useState } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Create a provider component to wrap your app and manage the cart state
export const CartProvider = ({ children }) => {
  // State to manage the cart data
  const [cart, setCart] = useState(null);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext in components


export default CartContext;
