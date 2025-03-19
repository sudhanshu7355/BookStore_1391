import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistItem = ({ book }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(isInCart(book.id));

  const handleAddToCart = () => {
    addToCart(book);
    setAddedToCart(true);
    
    // Reset button text after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Image source={book.image} style={styles.image} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>Rs. {book.currentPrice}</Text>
          <Text style={styles.originalPrice}>Rs.{book.originalPrice}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => removeFromWishlist(book.id)}
          >
            <Icon
              name="heart"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addButtonText}>
              {addedToCart ? "ADDED TO BAG" : "ADD TO BAG"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 8,
  },
  cardContent: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistButton: {
    width: 46,
    height: 46,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addButton: {
    flex: 1,
    backgroundColor: colors.primary,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default WishlistItem;