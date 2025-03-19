// src/components/Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.copyrightText}>
        Copyright © 2020, Bookstore Private Limited. All Rights Reserved
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#2a1515',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyrightText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Footer;