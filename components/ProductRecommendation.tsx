import React, {useContext} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ShoppingCartContext} from './ShoppingCartProvider';

const {width} = Dimensions.get('window');

function recommendProducts(cartItems, products) {
  const recommendations = [];

  // Iterate through the cart items
  for (const item of cartItems) {
    // Find recommended products for each item in the cart
    const itemRecommendations = products.filter(p => {
      // Check if the product's tags or category match the current product
      return (
        p.tags.some(tag => item.tags.includes(tag)) ||
        p.category === item.category
      );
    });

    // Remove the current item from the recommendations
    const filteredRecommendations = itemRecommendations.filter(
      p => p.id !== item.id,
    );

    // Add the first 3 recommendations to the overall recommendations array
    recommendations.push(...filteredRecommendations.slice(0, 3));

    // If we have 3 or more recommendations, break out of the loop
    if (recommendations.length >= 3) {
      break;
    }
  }

  // Return the top 3 recommendations
  return recommendations.slice(0, 3);
}

const ProductCard = ({product}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
};

const ProductRecommendation = () => {
  const {cartItems, products} = useContext(ShoppingCartContext);
  const recommendation = recommendProducts(cartItems, products);
  return recommendation.length > 0 ? (
    <View style={styles.recommendationContainer}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        Recommendation based on your cart
      </Text>
      <FlatList
        data={recommendation}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.container}
        renderItem={({item}) => <ProductCard product={item} />}
      />
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  recommendationContainer: {
    borderTopColor: 'black',
    width: '100%',
    height: '45%',
    borderTopWidth: 2,
    paddingTop: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 6,
    marginVertical: 12,
    width: 130,
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: 40,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    objectFit: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginHorizontal: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginVertical: 8,
    marginHorizontal: 12,
  },
});

export default ProductRecommendation;
