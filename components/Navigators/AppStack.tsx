import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PageHome from '../PageHome';
import ARPage from '../ARPage';
import ProductInformation from '../ProductInformation';
import MapScreen from '../MapScreen';
import PaymentSuccessfulPage from '../PaymentSuccessful';
import Chat from '../Chat';
import GetIngredientsFromRecipe from '../GetIngredientsFromRecipe';
import ScanProduct from '../ScanProduct';
import SearchScreen from '../ProductNavigation';
import SuggestRecipesScreen from '../SuggestRecipesScreen';
import MapLocation from '../MapLocation';
import Gamification from '../Gamification';
// import MapLocation from '../MapLocation';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={PageHome} />
      <Stack.Screen name="AR" component={ARPage} />
      <Stack.Screen name="Product Information" component={ProductInformation} />
      <Stack.Screen name="Product Navigation" component={SearchScreen} />
      <Stack.Screen name="Map Screen" component={MapScreen} />
      <Stack.Screen
        name="Payment Successfull"
        component={PaymentSuccessfulPage}
      />
      <Stack.Screen name="MapBox" component={MapLocation} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Recipes" component={GetIngredientsFromRecipe} />
      <Stack.Screen
        name="Ingredients Recipes"
        component={SuggestRecipesScreen}
      />
      <Stack.Screen name="Gamification" component={Gamification} />
      <Stack.Screen name="Scan Product" component={ScanProduct} />
    </Stack.Navigator>
  );
};

export default AppStack;
