import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = [
  {
    name: 'Product Information',
    icon: require('../assets/juice.jpg'),
    to: 'Product Information',
  },
  {
    name: 'AR',
    icon: require('../assets/juice.jpg'),
    to: 'AR',
  },
  //   {name: 'PHARMACY', icon: require('./assets/pharmacy.png')},
  //   {name: 'ELECTRONICS', icon: require('./assets/electronics.png')},
  //   {name: 'HOME', icon: require('./assets/home.png')},
  //   {name: 'APPAREL', icon: require('./assets/apparel.png')},
  //   {name: 'TOYS', icon: require('./assets/toys.png')},
  //   {name: 'HARDWARE', icon: require('./assets/hardware.png')},
];

const PageHome = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(category.to);
            }}
            key={index}
            style={styles.categoryItem}>
            <View style={styles.iconContainer}>
              <Image source={category.icon} style={styles.icon} />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  iconContainer: {
    backgroundColor: '#005cbf',
    borderRadius: 50,
    padding: 5,
  },
  icon: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: 2000,
  },
  categoryText: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PageHome;
