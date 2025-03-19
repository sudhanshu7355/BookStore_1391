// src/screens/HomeScreen.js
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import BookList from '../components/BookList';
import Footer from '../components/Footer';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <BookList />
      </ScrollView>
      <Footer />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default HomeScreen;