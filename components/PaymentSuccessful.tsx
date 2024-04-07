import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useAuthState} from './AuthContext';
import {ShoppingCartContext} from './ShoppingCartProvider';

const PaymentSuccessfulPage = ({navigation}) => {
  const {logout} = useAuthState();
  const {emptyCart} = useContext(ShoppingCartContext);

  const handleGoToHome = () => {
    emptyCart();
    logout();
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/success.png')} // Assuming you have a success icon image
        style={styles.successIcon}
      />
      <Text style={styles.message}>Payment Successful!</Text>
      <Text style={styles.subMessage}>Thank you for your purchase.</Text>

      <TouchableOpacity onPress={handleGoToHome} style={styles.button}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#007bff',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 16,
    color: '#888888',
  },
});

export default PaymentSuccessfulPage;
