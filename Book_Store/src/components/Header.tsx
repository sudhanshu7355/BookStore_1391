import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Header = ({ navigation }) => {
  const { wishlistItems } = useWishlist();
  const { getCartCount } = useCart();
  
  const hasWishlistItems = wishlistItems.length > 0;
  const cartCount = getCartCount();
  const hasCartItems = cartCount > 0;

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Icon name="book" size={24} color={colors.primary} />
        <Text style={styles.logoText}>Bookstore</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Icon name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <Icon
            name={hasWishlistItems ? "heart" : "heart-outline"}
            size={24}
            color={colors.primary}
          />
          {hasWishlistItems && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{wishlistItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon 
            name={hasCartItems ? "cart" : "cart-outline"} 
            size={24} 
            color={colors.primary} 
          />
          {hasCartItems && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: 8,
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 18,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Header;