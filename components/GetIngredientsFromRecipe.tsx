import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

const GetIngredientsFromRecipe = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSearch = () => {
    fetchRecipes(searchQuery);
  };

  const fetchRecipes = query => {
    const apiKey = `1eda2b23b95544369a82d2d40f2b5086`;
    const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxFat=25&number=5&apiKey=${apiKey}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.results);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  };

  const fetchIngredients = recipeId => {
    const apiKey = `1eda2b23b95544369a82d2d40f2b5086`;
    const URL = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setIngredients(data.extendedIngredients);
      })
      .catch(error => console.error('Error fetching ingredients:', error));
  };

  const renderRecipeItem = ({item}) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => handleRecipePress(item.id)}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleRecipePress = recipeId => {
    setSelectedRecipe(recipeId);
    fetchIngredients(recipeId);
  };

  const toggleIngredient = ingredientId => {
    if (selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients(
        selectedIngredients.filter(id => id !== ingredientId),
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientId]);
    }
  };

  const renderIngredientItem = ({item, index}) => (
    <TouchableOpacity
      style={{
        ...styles.ingredientItemContainer,
        borderColor: selectedIngredients.includes(item.id) ? 'green' : 'gray',
        backgroundColor: selectedIngredients.includes(item.id)
          ? '#5DAB75'
          : '#DACFCF',
      }}
      onPress={() => toggleIngredient(item.id)}>
      <Text
        style={{
          ...styles.ingredientItem,
          color: selectedIngredients.includes(item.id) ? '#FAE6E6' : 'black',
          fontWeight: '500',
        }}>
        {item.original}
      </Text>
    </TouchableOpacity>
  );

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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FlatList
          numColumns={2}
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={item => item.id.toString()}
        />
        {selectedRecipe && (
          <View style={{flex: 1}}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <FlatList
              data={ingredients}
              renderItem={renderIngredientItem}
              keyExtractor={(item, index) => `${item.id}_${index}`}
            />
          </View>
        )}
      </View>
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
    borderRadius: 8,
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
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: 150,
  },
  sectionTitle: {
    display: 'flex',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientItemContainer: {
    flexDirection: 'row',
    borderColor: 'gray',
    padding: 10,
    borderRadius: 2000,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientItem: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default GetIngredientsFromRecipe;
