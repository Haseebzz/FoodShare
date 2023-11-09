import express from 'express';

import userController from '../controllers/userController.js';




// Create an Express router
const router = express.Router();
router.post('/register', userController.registerUser) // Get all trips

router.post('/login', userController.loginUser); // Get all trips


// Export the router
export default router;

