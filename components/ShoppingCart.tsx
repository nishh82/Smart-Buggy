import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  StripeProvider,
  useConfirmPayment,
  useStripe,
} from '@stripe/stripe-react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {getToken, http} from './api/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ShoppingCartContext} from './ShoppingCartProvider';

const ShoppingCart = () => {
  const {cartItems, removeItem} = useContext(ShoppingCartContext);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.13;
    return subtotal + tax;
  };

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const total = calculateTotal();
  const fetchPaymentSheetParams = async () => {
    if (total > 0) {
      try {
        const ax = http();
        const token = await getToken();

        console.log(calculateTotal());
        const {data} = await ax.post(
          '/payment-sheet',
          {amount: calculateTotal() ? calculateTotal() : 0},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const {paymentIntent, ephemeralKey, customer} = await data;

        return {
          paymentIntent,
          ephemeralKey,
          customer,
        };
      } catch (error) {
        Alert.alert('Error', 'There was an error fetching user data!');
      }
    }
  };

  useEffect(() => {
    const initializePaymentSheet = async () => {
      const {paymentIntent, ephemeralKey, customer, publishableKey} =
        await fetchPaymentSheetParams();

      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Winnovate Systems',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        returnURL: 'https://arapp-server.onrender.com/',
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name,
          email,
        },
      });
      if (!error) {
        setLoading(true);
      }
    };

    if (total > 0) {
      initializePaymentSheet();
    }
  }, [initPaymentSheet, total]);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      navigation.navigate('Payment Successfull');
      // Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  const showRemoveAlert = (id: number) => {
    Alert.alert(
      'Remove Product',
      'Are you sure you want to remove this product?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => removeItem(id)},
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        </View>
        <View>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            onPress={() => showRemoveAlert(item.id)}
            style={{
              backgroundColor: 'red',
              padding: 2,
              borderRadius: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <StripeProvider publishableKey="pk_test_51OtzzEILJiKXbKOocoaYlITtBq3STH3Nxgg5YytN53ZQOVMwfCfiwI2ZIWxqCGwTVhAZnQcHHj84Rawdb0HItQyX00LYnC7z4F">
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Shopping Cart</Text>
        </View>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.totals}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>
            ${calculateSubtotal().toFixed(2)}
          </Text>
        </View>
        <View style={styles.totals}>
          <Text style={styles.totalLabel}>
            Total <Text style={{fontSize: 10}}>(incl. 13% tax)</Text>:
          </Text>
          <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={openPaymentSheet}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  checkoutButton: {
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 5,

    // alignSelf: 'flex-end',
  },
  checkoutButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 35,
    height: 35,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShoppingCart;
