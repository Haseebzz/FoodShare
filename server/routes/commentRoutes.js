import express from 'express';

import commentController from '../controllers/commentController.js';




// Create an Express router
const router = express.Router();
router.post('/', commentController.createComment) // Get all trips

router.get('/:recipe_id', commentController.getCommentsForRecipe); // Get all trips
router.delete('/:commentId', commentController.deleteComment)

// Export the router
export default router;

