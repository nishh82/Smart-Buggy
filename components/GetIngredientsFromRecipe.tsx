import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {products} from './itemLocation';

const GetIngredientsFromRecipe = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const handleSearch = () => {
    fetchRecipes(searchQuery);
  };

  const fetchRecipes = query => {
    const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxFat=25&number=2&apiKey=202d0436ad3940febb34c174107630fc`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.results);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  };

  const fetchIngredients = recipeId => {
    const URL = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=202d0436ad3940febb34c174107630fc`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setIngredients(data.extendedIngredients);
      })
      .catch(error => console.error('Error fetching ingredients:', error));
  };

  const renderRecipeItem = ({item}) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => handleRecipePress(item.id)}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleRecipePress = recipeId => {
    setSelectedRecipe(recipeId);
    fetchIngredients(recipeId);
  };

  const renderIngredientItem = ({item, index}) => {
    const location = getMapLocation(item);
    return (
      <View
        key={`${item.id}_${index}`}
        style={{
          display: 'flex',
          borderBottomWidth: 2,
          borderBottomColor: 'gray',
          paddingVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.ingredientItem}>{item.original}</Text>
        {location && (
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              borderRadius: 10,
              padding: 5,
              paddingHorizontal: 10,
              marginLeft: 10,
            }}
            onPress={() =>
              navigation.navigate('Map Screen', {
                location,
              })
            }>
            <Text style={{fontSize: 10, color: 'white', fontWeight: 600}}>
              LOCATE
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const getMapLocation = (item: {
    name: string;
    originial: string;
  }): String | undefined => {
    const product = products.find(
      prod => prod.name.toLowerCase() === item.name,
    );

    if (product) {
      return product.location;
    }

    return undefined;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.id.toString()}
      />
      {selectedRecipe && (
        <>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <FlatList
            data={ingredients}
            renderItem={renderIngredientItem}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientItem: {
    fontSize: 12,
    marginBottom: 4,
  },
});

export default GetIngredientsFromRecipe;
