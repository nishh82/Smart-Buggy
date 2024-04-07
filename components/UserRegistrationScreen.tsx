import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
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
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/background.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Enter Your Details</Text>
        <Text style={styles.description}>
          We need your email address to send you updates, special offers, and
          order bills.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 4,
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
});

export default UserRegistrationScreen;
