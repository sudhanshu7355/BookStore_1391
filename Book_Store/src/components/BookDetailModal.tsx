// src/components/BookDetailModal.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

const BookDetailModal = ({ visible, book, onClose }) => {
  if (!book) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.bookInfoContainer}>
            <Image source={book.image} style={styles.bookImage} />
            <View style={styles.titleContainer}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>by {book.author}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    flex: 1,
    marginTop: 80,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfoContainer: {
    flexDirection: 'row',
    marginTop: 30, // Added extra margin to accommodate the centered close button
    marginBottom: 20,
  },
  bookImage: {
    width: 100,
    height: 140,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 18,
    color: colors.gray,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 20,
  },
  descriptionContainer: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray,
    marginBottom: 16,
  },
});

export default BookDetailModal;