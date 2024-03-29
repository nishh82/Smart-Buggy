import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          SmartBuggy: Your Smart Shopping Companion
        </Text>
        <Text style={styles.description}>
          Smart Buggy is the ultimate shopping assistant attached to your
          trolley. Get store information, aisle locations, and real-time
          promotions while conveniently scanning products inside your cart for
          seamless checkout. Shopping has never been smarter!
        </Text>

        <Text style={{marginTop: 10}}>
          Ready to get started? Tap the "Scan QR" button below to begin scanning
          your Smart Buggy card and elevate your shopping experience!
        </Text>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('QRCodeScanner')}>
          <Text style={styles.checkoutButtonText}>SCAN QR</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/background.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  content: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
  },
  image: {
    width: 350,
    height: '100%',
    borderRadius: 10,
  },
  checkoutButton: {
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 25,
  },
  checkoutButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
