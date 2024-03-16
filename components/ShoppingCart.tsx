import React, {useEffect, useState} from 'react';
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

const ShoppingCart = ({cartItems}) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchPaymentSheetParams = async () => {
    try {
      const {data} = await axios.post(
        'https://arapp-server.onrender.com/payment-sheet',
        {amount: 50},
      );

      const {paymentIntent, ephemeralKey, customer} = await data;

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const initializePaymentSheet = async () => {
      const {paymentIntent, ephemeralKey, customer, publishableKey} =
        await fetchPaymentSheetParams();

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Winnovate Systems',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });
      if (!error) {
        setLoading(true);
      }
    };
    initializePaymentSheet();
  }, [initPaymentSheet]);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      navigation.navigate('Payment Successfull');
      // Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <View style={styles.cartItem}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        </View>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    );
  };

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

  return (
    <StripeProvider publishableKey="pk_test_51OtzzEILJiKXbKOocoaYlITtBq3STH3Nxgg5YytN53ZQOVMwfCfiwI2ZIWxqCGwTVhAZnQcHHj84Rawdb0HItQyX00LYnC7z4F">
      <View style={styles.container}>
        <Text style={styles.heading}>Shopping Cart</Text>
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
    width: 30,
    height: 30,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
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
