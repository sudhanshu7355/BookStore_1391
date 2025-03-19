import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

const OrderConfirmationScreen = ({ navigation, route }) => {
  const { orderId = '#123456' } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Icon name="book" size={24} color={colors.primary} />
          <Text style={styles.logoText}>Bookstore</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="search" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="heart-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="cart-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.celebrationContainer}>
          <Image 
            source={require('../../assets/images/order.png')} 
            style={styles.celebrationImage}
          />
        </View>

        <Text style={styles.successTitle}>Order Placed Successfully</Text>

        <Text style={styles.successMessage}>
          hurray!!! your order is confirmed the order id is {orderId} save the order id for further communication..
        </Text>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.continueButtonText}>CONTINUE SHOPPING</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.contactInfo}>
          <View style={styles.contactRow}>
            <Icon name="mail-outline" size={20} color={colors.primary} />
            <Text style={styles.contactText}>admin@bookstore.com</Text>
          </View>
          <View style={styles.contactRow}>
            <Icon name="call-outline" size={20} color={colors.primary} />
            <Text style={styles.contactText}>+91 8163475881</Text>
          </View>
          <View style={styles.contactRow}>
            <Icon name="location-outline" size={20} color={colors.primary} />
            <Text style={styles.contactText}>
              42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>Copyright © 2020, Bookstore Private Limited. All Rights Reserved</Text>
      </View>
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
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 8,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  celebrationContainer: {
    marginBottom: 20,
  },
  celebrationImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  celebrationFallback: {
    width: 150,
    height: 150,
    backgroundColor: '#f8f8f8',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  contactText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.black,
    flex: 1,
  },
  copyright: {
    padding: 16,
    backgroundColor: '#3c2415',
    alignItems: 'center',
  },
  copyrightText: {
    color: colors.white,
    fontSize: 12,
  },
});

export default OrderConfirmationScreen;