import { pool } from "../config/database.js";



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

// Add more methods for updating and deleting recipes as needed
export default {
   
   getAllRecipes
  };
  