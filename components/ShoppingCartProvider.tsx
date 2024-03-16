// ShoppingCartProvider.js - Context provider for shopping cart state
import React, {createContext, useState} from 'react';
import {allCartItems} from './cartItem';

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = product => {
    setCartItems([...cartItems, product]);
  };

  return (
    <ShoppingCartContext.Provider value={{cartItems, addToCart}}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
