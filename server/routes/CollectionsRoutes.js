import express from 'express';

import  CollectionController from '../controllers/CollectionsController.js';




// Create an Express router
const router = express.Router();
router.post('/', CollectionController.createCollection) // Get all trips
router.delete('/:collectionId', CollectionController.deleteCollection)
router.get('/:userId', CollectionController.getCollectionsByUserId)
router.post('/:collectionId/:recipeId', CollectionController.addRecipeToCollection)
router.get('/recipe/:collectionId', CollectionController.getRecipesByCollectionId)
// Export the router
export default router;

