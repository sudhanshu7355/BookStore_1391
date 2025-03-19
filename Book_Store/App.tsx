import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import CartScreen from './src/screens/CartScreen';
import SearchScreen from './src/screens/SearchScreen';
import colors from './src/constants/colors';
import { WishlistProvider } from './src/context/WishlistContext';
import { CartProvider } from './src/context/CartContext';
import OrderConfirmationScreen from './src/screens/OrderConfirmationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <NavigationContainer>
          <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name='Cart' component={CartScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen}/>

          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;