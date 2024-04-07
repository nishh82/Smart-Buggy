import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SuggestRecipesScreen = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = () => {
    getRecipes(ingredients);
  };

  const getRecipes = queryIngredients => {
    const number = 5;
    const apiKey = `1eda2b23b95544369a82d2d40f2b5086`;
    const URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryIngredients}&number=5&apiKey=${apiKey}`;

    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setRecipes(data);
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const renderRecipeItem = ({item}) => (
    <View style={styles.recipeContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.ingredientsContainer}>
        <Text style={styles.subtitle}>Used Ingredients:</Text>
        {item.usedIngredients.map(ingredient => (
          <Text key={ingredient.id} style={styles.ingredient}>
            {ingredient.original}
          </Text>
        ))}
        <Text style={styles.subtitle}>Missed Ingredients:</Text>
        {item.missedIngredients.map(ingredient => (
          <Text key={ingredient.id} style={styles.ingredient}>
            {ingredient.original}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Suggested Recipes</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ingredients separated by comma"
        value={ingredients}
        onChangeText={text => setIngredients(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        numColumns={2}
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  button: {
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
  recipeContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingTop: 20,
    paddingHorizontal: 16,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    height: 50,
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    marginBottom: 8,
    borderRadius: 8,
  },
  ingredientsContainer: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ingredient: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default SuggestRecipesScreen;
