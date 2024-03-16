import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {allCartItems} from './cartItem';
import {ShoppingCartContext} from './ShoppingCartProvider';

const PageBarcodeScanner = ({navigation}) => {
  const device = useCameraDevice('back');
  const {addToCart, cartItems} = useContext(ShoppingCartContext);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        const value = parseInt(codes[0].value);

        if (value) {
          const product = allCartItems.find(prd => prd.id === value);
          addToCart(product);
          navigation.navigate('Home');
        }
      }
      console.log(`Scanned ${codes[0].value} codes!`);
    },
  });

  if (device == null) return <Text>Error</Text>;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      codeScanner={codeScanner}
      device={device}
      isActive={true}
    />
  );
};

export default PageBarcodeScanner;
