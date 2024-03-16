import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import PageHome from './components/PageHome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ARPage from './components/ARPage';
import ProductInformation from './components/ProductInformation';
import ProductNavigation from './components/ProductNavigation';
import MapScreen from './components/MapScreen';
import PaymentSuccessful from './components/PaymentSuccessful';
import Chat from './components/Chat';
import GetIngredientsFromRecipe from './components/GetIngredientsFromRecipe';
import PageBarcodeScanner from './components/PageBarcodeScanner';
import ShoppingCartProvider from './components/ShoppingCartProvider';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ShoppingCartProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={PageHome} />
          <Stack.Screen name="AR" component={ARPage} />
          <Stack.Screen
            name="Product Information"
            component={ProductInformation}
          />
          <Stack.Screen
            name="Product Navigation"
            component={ProductNavigation}
          />
          <Stack.Screen name="Map Screen" component={MapScreen} />
          <Stack.Screen
            name="Payment Successfull"
            component={PaymentSuccessful}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Recipes" component={GetIngredientsFromRecipe} />
          <Stack.Screen name="QR Code" component={PageBarcodeScanner} />
        </Stack.Navigator>
      </ShoppingCartProvider>
    </NavigationContainer>
  );
}

export default App;
