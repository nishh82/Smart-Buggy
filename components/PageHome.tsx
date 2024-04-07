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
import ProductRecommendation from './ProductRecommendation';

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
    name: 'Recipes from Ingredient',
    icon: require('../assets/recipe.png'),
    to: 'Ingredients Recipes',
  },
  {
    name: 'Chat with us',
    icon: require('../assets/chat.png'),
    to: 'Chat',
  },
  {
    name: 'Scan Products',
    icon: require('../assets/qr-code.jpeg'),
    to: 'Scan Product',
  },
  {
    name: 'Gamification',
    icon: require('../assets/gamification.jpg'),
    to: 'Gamification',
  },
];

const PageHome = ({navigation}: any) => {
  const {cartItems} = useContext(ShoppingCartContext);
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
            numColumns={2}
          />
          <ProductRecommendation />
        </View>
        <View style={styles.cartContainer}>
          <ShoppingCart />
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
  recommendationContainer: {
    borderTopColor: 'black',
    width: '100%',
    height: '45%',
    borderTopWidth: 2,
    paddingTop: 14,
  },
  categoryContainer: {
    width: '60%',
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
    marginHorizontal: 30,
  },
  icon: {
    width: 120,
    height: 120,
    objectFit: 'contain',
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
