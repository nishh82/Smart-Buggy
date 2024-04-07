// context/AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext} from 'react';

const AuthContext = createContext<{
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}>();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async user => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('token', user.token);
    await AsyncStorage.setItem('name', user.user.name);
    await AsyncStorage.setItem('email', user.user.email);

    // Perform login actions here
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');

    // Perform logout actions here
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return auth;
};
