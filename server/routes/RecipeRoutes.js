import express from 'express';
import recipeController from '../controllers/recipeController.js';

// Create an Express router
const router = express.Router();

// Search for recipes by name
router.get('/search', recipeController.searchRecipesByName);
router.get('/filter/:category', recipeController.getRecipesByCategory);

// Create, edit, delete, and get recipes by ID
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.editRecipe);
router.delete('/:id', recipeController.deleteRecipe);
router.get('/:id', recipeController.getRecipeById);

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Export the router
export default router;
