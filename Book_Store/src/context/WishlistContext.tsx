// src/context/WishlistContext.js
import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (book) => {
    setWishlistItems((prevItems) => {
      // Check if the book is already in wishlist
      if (!prevItems.some(item => item.id === book.id)) {
        return [...prevItems, book];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlistItems((prevItems) => 
      prevItems.filter(item => item.id !== bookId)
    );
  };

  const isInWishlist = (bookId) => {
    return wishlistItems.some(item => item.id === bookId);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);