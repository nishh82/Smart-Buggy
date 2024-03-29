import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PageHome from './PageHome';
import ARPage from './ARPage';
import ProductInformation from './ProductInformation';
import MapScreen from './MapScreen';
import PaymentSuccessfulPage from './PaymentSuccessful';
import Chat from './Chat';
import GetIngredientsFromRecipe from './GetIngredientsFromRecipe';
import PageBarcodeScanner from './PageBarcodeScanner';
import ScanProduct from './ScanProduct';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={PageHome} />
      <Stack.Screen name="AR" component={ARPage} />
      <Stack.Screen name="Product Information" component={ProductInformation} />
      <Stack.Screen name="Map Screen" component={MapScreen} />
      <Stack.Screen
        name="Payment Successfull"
        component={PaymentSuccessfulPage}
      />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Recipes" component={GetIngredientsFromRecipe} />
      <Stack.Screen name="QR Code" component={PageBarcodeScanner} />
      <Stack.Screen name="Scan Product" component={ScanProduct} />
    </Stack.Navigator>
  );
};

export default AppStack;
