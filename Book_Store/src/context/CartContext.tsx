import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      // Check if the book is already in cart
      const existingItem = prevItems.find(item => item.book.id === book.id);
      
      if (existingItem) {
        // If book exists, update quantity
        return prevItems.map(item => 
          item.book.id === book.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If book doesn't exist, add new item with quantity 1
        return [...prevItems, { book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => 
      prevItems.filter(item => item.book.id !== bookId)
    );
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCartItems((prevItems) => 
      prevItems.map(item => 
        item.book.id === bookId 
          ? { ...item, quantity: quantity } 
          : item
      )
    );
  };

  const isInCart = (bookId) => {
    return cartItems.some(item => item.book.id === bookId);
  };
  
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => 
      total + (item.book.currentPrice * item.quantity), 0
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart,
      updateQuantity,
      isInCart,
      getCartCount,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);