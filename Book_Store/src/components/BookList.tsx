// src/components/BookList.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BookItem from './BookItem';
import BookDetailModal from './BookDetailModal';
import { books } from '../constants/data';
import colors from '../constants/colors';

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBookPress = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Books</Text>
        <Text style={styles.headerCount}>({books.length} Items)</Text>
      </View>
      <View style={styles.grid}>
        {books.map((book, index) => (
          <BookItem 
            key={index} 
            book={book} 
            onBookPress={handleBookPress}
          />
        ))}
      </View>
      
      <BookDetailModal 
        visible={modalVisible}
        book={selectedBook}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.black,
  },
  headerCount: {
    fontSize: 18,
    color: colors.gray,
    marginLeft: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default BookList;