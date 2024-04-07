import React from 'react';
import {useAuthState} from '../AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const AppNavigator = () => {
  const {isLoggedIn} = useAuthState();

  if (isLoggedIn) {
    return <AppStack />;
  } else {
    return <AuthStack />;
  }
};

export default AppNavigator;
