import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ShoppingCartProvider from './components/ShoppingCartProvider';
import {AuthProvider} from './components/AuthContext';
import AppNavigator from './components/Navigators/AppNavigator';

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
