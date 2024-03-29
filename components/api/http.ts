import axios from 'axios';
import storage from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

storage.save({
  key: 'token',
  id: 'data',
  data: 'hello',
});

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const baseURL = 'https://arapp-server.onrender.com/';

export const http = () => {
  return axios.create({
    baseURL,
    withCredentials: true,
    // headers: {
    //   Authorization: `Bearer ${getToken()}`,
    // },
  });
};
