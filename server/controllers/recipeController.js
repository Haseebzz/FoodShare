import { pool } from "../config/database.js";
const createRecipe = async (req, res) => {
  const { image, name, description, ingredients, instructions, category, owner } = req.body;

  try {
    // Insert the recipe into the recipes table with user_id
    const createRecipeQuery = `
      INSERT INTO recipes (image, name, description, ingredients, instructions, category, owner)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const recipeResult = await pool.query(createRecipeQuery, [image, name, description, ingredients, instructions, category, owner]);

    res.status(201).json({ message: 'Recipe created successfully', recipe: recipeResult.rows[0] });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'An error occurred while creating the recipe.' });
  }
};


// Get a list of all recipes
const getAllRecipes = (req, res) => {
  // Construct the SQL query to fetch all recipes
  const selectRecipesQuery = 'SELECT * FROM recipes;';

  // Execute the SQL query using the pool
  pool.query(selectRecipesQuery, (error, result) => {
    if (error) {
      console.error('Error fetching recipes:', error);
      return res.status(500).json({ error: 'An error occurred while fetching recipes.' });
    }

    const recipes = result.rows;
    res.json(recipes);
  });
};
// ...

// Edit a recipe
const editRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const { image, name, description, ingredients, instructions, category } = req.body;

  try {
    // Update the recipe in the recipes table without changing the owner
    const editRecipeQuery = `
      UPDATE recipes
      SET image = $1, name = $2, description = $3, ingredients = $4, instructions = $5, category = $6
      WHERE id = $7
      RETURNING *;
    `;
    const recipeResult = await pool.query(editRecipeQuery, [image, name, description, ingredients, instructions, category, recipeId]);

    if (recipeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe updated successfully', recipe: recipeResult.rows[0] });
  } catch (error) {
    console.error('Error editing recipe:', error);
    res.status(500).json({ error: 'An error occurred while editing the recipe.' });
  }
};


const deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;

  try {
    // Delete references to the recipe in collection_recipes table
    const deleteCollectionRecipesQuery = `
      DELETE FROM collection_recipes
      WHERE recipe_id = $1;
    `;
    await pool.query(deleteCollectionRecipesQuery, [recipeId]);

    // Delete references to the recipe in comments table
    const deleteCommentsQuery = `
      DELETE FROM comments
      WHERE recipe_id = $1;
    `;
    await pool.query(deleteCommentsQuery, [recipeId]);

    // Now that references in collection_recipes and comments are deleted, delete the recipe
    const deleteRecipeQuery = `
      DELETE FROM recipes
      WHERE id = $1
      RETURNING *;
    `;
    const recipeResult = await pool.query(deleteRecipeQuery, [recipeId]);

    if (recipeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully', recipe: recipeResult.rows[0] });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'An error occurred while deleting the recipe.' });
  }
};



// Get a single recipe by ID
const getRecipeById = async (req, res) => {
  const recipeId = req.params.id;

  try {
    // Fetch the recipe from the recipes table
    const getRecipeQuery = `
      SELECT * FROM recipes
      WHERE id = $1;
    `;
    const recipeResult = await pool.query(getRecipeQuery, [recipeId]);

    if (recipeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipeResult.rows[0]);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'An error occurred while fetching the recipe.' });
  }
};


// ...
// Search for recipes by name
const searchRecipesByName = async (req, res) => {
  const { name } = req.query;

  try {
    // Construct the SQL query to search for recipes by name
    const searchRecipesQuery = `
      SELECT * FROM recipes
      WHERE name ILIKE $1;
    `;

    // Execute the SQL query using the pool
    const result = await pool.query(searchRecipesQuery, [`%${name}%`]);

    const recipes = result.rows;

    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found with the specified name.' });
    }

    res.json(recipes);
  } catch (error) {
    console.error('Error searching for recipes by name:', error);
    res.status(500).json({ error: 'An error occurred while searching for recipes by name.' });
  }
};

const getRecipesByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const selectQuery = `
      SELECT * 
      FROM recipes
      WHERE category = $1
    `;

    const results = await pool.query(selectQuery, [category]);

    if (results.rows.length === 0) {
      // Handle the case where no recipes with the specified category were found
      res.status(404).json({ error: 'Recipes not found for the specified category' });
    } else {
      // Send the results as JSON
      res.status(200).json(results.rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Add more methods for updating and deleting recipes as needed
export default {
   createRecipe,
   getAllRecipes,
   editRecipe,
   deleteRecipe,
   getRecipeById,
   searchRecipesByName,
   getRecipesByCategory, // Add this line to export the new function
  };
  
