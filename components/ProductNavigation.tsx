import React, {useContext, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ShoppingCartContext} from './ShoppingCartProvider';

const SearchScreen = ({navigation}) => {
  const {products} = useContext(ShoppingCartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const renderProduct = ({item}: {item: Product}) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() =>
          navigation.navigate('Map Screen', {
            location: item.location,
          })
        }>
        <Text style={styles.mapButtonText}>Open Maps</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 10, fontSize: 16}}>Search</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      {searchTerm ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{marginTop: 100, fontSize: 22, fontWeight: 'bold'}}>
            Search for products
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  productContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  mapButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
});

export default SearchScreen;
