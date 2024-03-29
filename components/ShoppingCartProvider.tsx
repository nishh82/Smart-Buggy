import React, {createContext, useState} from 'react';
import {Product} from './cartItem';

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const newCartItems = [...prev];
      const idx = newCartItems.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        newCartItems[idx].quantity = newCartItems[idx].quantity + 1;
      } else {
        newCartItems.push(product);
      }
      return newCartItems;
    });
  };

  return (
    <ShoppingCartContext.Provider value={{cartItems, addToCart}}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
