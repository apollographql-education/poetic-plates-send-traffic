const GetRecipeQuery = `
  query GetRecipePage {
    recipe(id: "recOZrH0RhjSjATBp") {
      id
      name
      cookingTime
      prepTime
      readyTime
      servings
      instructions
      ingredients {
        text
      }
    }
    recentlyAddedRecipes {
      name
      cookingTime
      servings
    }
  }
`;

const GetRandomRecipeQuery = `
  query GetRandomRecipe {
    randomRecipe {
      id
      name
      readyTime
      servings
      ingredients {
        text
      }
    }
  }
`;

export { GetRandomRecipeQuery, GetRecipeQuery };
