import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

import axios from 'axios';
import {http} from './api/http';
import {useAuthState} from './AuthContext';

const screenWidth = Dimensions.get('window').width;
const cameraWidth = screenWidth * 0.8;
const QRCodeScannerScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {login} = useAuthState();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes => {
      if (codes.length > 0) {
        const value = codes[0].value;
        try {
          setLoading(true);

          try {
            const ax = http();
            const response = await ax.post('/api/users/check', {
              qrCodeData: value,
            });

            console.log('Response', response.data);

            if (response.data.status === 'success') {
              login(response.data);
              // Navigate to the home screen
              navigation.navigate('Home');
            } else {
              // Navigate to the user registration screen
              navigation.navigate('User Registration', {qrCodeData: value});
            }
          } catch (error) {
            console.error('Error checking user:', error.message);
          }
        } catch (error) {}
      }
      console.log(`Scanned ${codes[0].value} codes!`);
    },
  });

  if (device == null) return <View />;

  return (
    <Camera
      isActive
      device={device}
      style={StyleSheet.absoluteFill}
      // orientation={'landscape-left'}
      codeScanner={codeScanner}>
      <View style={styles.scanBoxContainer}>
        <View style={styles.scanBox}>
          <Text style={styles.scanBoxText}>SCAN QR CODE</Text>
        </View>
      </View>
    </Camera>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 0.5,
    resizeMode: 'contain',
  },
  cameraContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scanBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 30,
    paddingHorizontal: 150,
    borderRadius: 5,
  },
  scanBoxText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default QRCodeScannerScreen;
