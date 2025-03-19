// src/screens/WishlistScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WishlistItem from '../components/WishlistItem';
import colors from '../constants/colors';
import { useWishlist } from '../context/WishlistContext';

const WishlistScreen = ({ navigation }) => {
  const { wishlistItems } = useWishlist();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist <Text style={styles.itemCount}>({wishlistItems.length} Items)</Text></Text>
      </View>
      
      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          renderItem={({ item }) => <WishlistItem book={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="heart-outline" size={60} color={colors.gray} />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
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
    paddingVertical: 12,
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
  listContent: {
    padding: 16,
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
    fontWeight: 'bold',
  },
});

export default WishlistScreen;