import express from 'express';

import recipeController from '../controllers/recipeController.js';




// Create an Express router
const router = express.Router();


router.get('/', recipeController.getAllRecipes); // Get all trips


// Export the router
export default router;

