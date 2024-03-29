import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import {http} from './api/http';
import {useAuthState} from './AuthContext';

const UserRegistrationScreen = ({route, navigation}) => {
  const {qrCodeData} = route.params;
  const {login} = useAuthState();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    try {
      const ax = http();
      // Send the user data to the backend
      const {data} = await ax.post('/api/users/register', {
        qrCodeData,
        email,
        name,
      });

      login(data);

      console.log(data);

      // Navigate to the home screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Registration</Text>
      <Text style={styles.description}>
        We need your email address to send you updates and special offers.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default UserRegistrationScreen;
