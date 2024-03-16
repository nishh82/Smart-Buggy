import React, {useContext, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ShoppingCart from './ShoppingCart';
import {ShoppingCartContext} from './ShoppingCartProvider';

const categories = [
  {
    name: 'Product Information',
    icon: require('../assets/home.jpeg'),
    to: 'Product Information',
  },
  {
    name: 'Navigate Products',
    icon: require('../assets/navigate.jpeg'),
    to: 'Product Navigation',
  },
  {
    name: 'Get Recipes',
    icon: require('../assets/recipes.png'),
    to: 'Recipes',
  },
  {
    name: 'Chat with us',
    icon: require('../assets/chat.png'),
    to: 'Chat',
  },
  {
    name: 'QR Code',
    icon: require('../assets/qr-code.jpeg'),
    to: 'QR Code',
  },
];

const PageHome = ({navigation}: any) => {
  const {cartItems} = useContext(ShoppingCartContext);

  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 2,
  //     name: 'Neilson Milk',
  //     price: 14.99,
  //     quantity: 2,
  //     image: require('../assets/item2.webp'),
  //   },
  //   {
  //     id: 3,
  //     name: 'Tropicana',
  //     price: 19.99,
  //     quantity: 1,
  //     image: require('../assets/item4.jpg'),
  //   },
  // ]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.to);
        }}
        style={styles.categoryItem}>
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.icon} />
        </View>
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            key={'#'}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={renderItem}
            horizontal={false}
            numColumns={3}
          />
        </View>
        <View style={styles.cartContainer}>
          <ShoppingCart cartItems={cartItems} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  categoryContainer: {
    width: '70%',
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  iconContainer: {
    backgroundColor: '#005cbf',
    borderRadius: 2000,
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
  cartContainer: {
    flex: 1,
    borderLeftColor: 'gray',
    borderLeftWidth: 2,
    padding: 10,
  },
});

export default PageHome;
