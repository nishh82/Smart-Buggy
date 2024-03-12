import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import PageHome from './components/PageHome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ARPage from './components/ARPage';
import ProductInformation from './components/ProductInformation';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PageHome} />
        <Stack.Screen name="AR" component={ARPage} />
        <Stack.Screen
          name="Product Information"
          component={ProductInformation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
