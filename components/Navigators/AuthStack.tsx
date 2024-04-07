import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import WelcomeScreen from '../WelcomeScreen';
import QRCodeScannerScreen from '../QRCodeScannerScreen';
import UserRegistrationScreen from '../UserRegistrationScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="User Registration"
        component={UserRegistrationScreen}
      />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
