import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { useCart } from '../context/CartContext';
import CustomerDetails from '../components/CustomerDetails';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const { book, quantity } = item;
  
  return (
    <View style={styles.cartItem}>
      <Image source={book.image} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{book.title}</Text>
        <Text style={styles.itemAuthor}>by {book.author}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>Rs. {book.currentPrice}</Text>
          <Text style={styles.originalPrice}>Rs. {book.originalPrice}</Text>
        </View>
        
        <View style={styles.quantityRow}>
          <View style={styles.quantityControl}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(book.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Icon 
                name="remove" 
                size={20} 
                color={quantity <= 1 ? colors.lightGray : colors.black} 
              />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(book.id, quantity + 1)}
            >
              <Icon name="add" size={20} color={colors.black} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => removeFromCart(book.id)}
          >
            <Icon name="trash-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => removeFromCart(book.id)}
      >
        <Icon name="close" size={24} color={colors.gray} />
      </TouchableOpacity>
    </View>
  );
};

const CustomerDetailsSummary = ({ details }) => {
  if (!details || !details.name) return null;
  
  return (
    <View style={styles.detailsSummary}>
      <Text style={styles.detailsSummaryTitle}>Delivery Details</Text>
      <View style={styles.detailsRow}>
        <Icon name="person-outline" size={16} color={colors.gray} style={styles.detailsIcon} />
        <Text style={styles.detailsText}>{details.name}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Icon name="call-outline" size={16} color={colors.gray} style={styles.detailsIcon} />
        <Text style={styles.detailsText}>{details.phone}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Icon name="mail-outline" size={16} color={colors.gray} style={styles.detailsIcon} />
        <Text style={styles.detailsText}>{details.email}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Icon name="location-outline" size={16} color={colors.gray} style={styles.detailsIcon} />
        <Text style={styles.detailsText}>
          {details.address}
          {details.city ? `, ${details.city}` : ''}
          {details.zipCode ? ` - ${details.zipCode}` : ''}
        </Text>
      </View>
    </View>
  );
};

const CartScreen = ({ navigation }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [customerDetails, setCustomerDetails] = useState({});
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  
  const handlePlaceOrder = () => {
    if (!detailsSubmitted) {
      Alert.alert('Missing Information', 'Please add your delivery details before placing an order.');
      return;
    }
    
    setPlaceOrderLoading(true);
    // Simulate order processing
    setTimeout(() => {
      setPlaceOrderLoading(false);
      
      // Generate a random order ID (you'd typically get this from your backend)
      const orderId = `#${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Navigate to the order confirmation screen
      navigation.navigate('OrderConfirmation', { orderId });
    }, 1500);
  
    
    setPlaceOrderLoading(true);
    // Simulate order processing
    setTimeout(() => {
      setPlaceOrderLoading(false);
      // Navigate to order confirmation or show success message
      alert('Order placed successfully!');
      // You might want to clear the cart here
    }, 1500);
  };
  
  const handleDetailsChange = (details) => {
    setCustomerDetails(details);
  };
  
  const handleDetailsAdded = (details) => {
    setDetailsSubmitted(true);
    setCustomerDetails(details);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          My Bag <Text style={styles.itemCount}>({cartItems.length} Items)</Text>
        </Text>
      </View>
      
      {cartItems.length > 0 ? (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.itemsContainer}>
              {cartItems.map(item => (
                <CartItem 
                  key={item.book.id}
                  item={item} 
                  updateQuantity={updateQuantity} 
                  removeFromCart={removeFromCart}
                />
              ))}
            </View>
            
            <View style={styles.detailsContainer}>
              {detailsSubmitted && (
                <CustomerDetailsSummary details={customerDetails} />
              )}
              
              <CustomerDetails 
                onDetailsChange={handleDetailsChange} 
                onDetailsAdded={handleDetailsAdded}
              />
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>Rs. {getTotalPrice()}</Text>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.placeOrderButton,
                (!detailsSubmitted || placeOrderLoading) && styles.placeOrderButtonDisabled
              ]}
              onPress={handlePlaceOrder}
              disabled={!detailsSubmitted || placeOrderLoading}
            >
              <Text style={styles.placeOrderButtonText}>
                {placeOrderLoading ? 'PROCESSING...' : 'PLACE ORDER'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="cart-outline" size={60} color={colors.gray} />
          <Text style={styles.emptyText}>Your shopping bag is empty</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>BROWSE BOOKS</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemCount: {
    fontWeight: 'normal',
    color: colors.gray,
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  itemsContainer: {
    backgroundColor: colors.white,
    paddingBottom: 8,
  },
  detailsContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  itemImage: {
    width: 80,
    height: 120,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
    marginRight: 24,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemAuthor: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
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
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
  },
  quantityButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    paddingHorizontal: 16,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    padding: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
  placeOrderButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  placeOrderButtonDisabled: {
    backgroundColor: colors.gray,
  },
  placeOrderButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: colors.gray,
    marginTop: 20,
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  browseButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // New styles for customer details summary
  detailsSummary: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  detailsSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailsIcon: {
    marginRight: 8,
    width: 20,
  },
  detailsText: {
    fontSize: 14,
    color: colors.black,
    flex: 1,
  },
});

export default CartScreen;