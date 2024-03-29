import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ShoppingCartProvider from './components/ShoppingCartProvider';
import AppStack from './components/AppStack';
import AuthStack from './components/AuthStack';
import {AuthProvider, useAuthState} from './components/AuthContext';
import AppNavigator from './components/AppNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ShoppingCartProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ShoppingCartProvider>
    </NavigationContainer>
  );
}

export default App;
