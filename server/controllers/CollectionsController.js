import { pool } from '../config/database.js';

const createCollection = async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    const createCollectionQuery = `
      INSERT INTO collections (name, description, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const collectionResult = await pool.query(createCollectionQuery, [name, description, userId]);

    res.status(201).json({ message: 'Collection created successfully', collection: collectionResult.rows[0] });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'An error occurred while creating the collection.' });
  }
};



  
  const getCollectionsByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const getCollectionsQuery = `
        SELECT * FROM collections
        WHERE user_id = $1;
      `;
  
      const collectionsResult = await pool.query(getCollectionsQuery, [userId]);
  
      res.json(collectionsResult.rows);
    } catch (error) {
      console.error('Error fetching collections:', error);
      res.status(500).json({ error: 'An error occurred while fetching collections.' });
    }
  };

  const addRecipeToCollection = async (req, res) => {
    const { collectionId, recipeId } = req.params;
  
    try {
      const checkDuplicateQuery = `
        SELECT * FROM collection_recipes
        WHERE collection_id = $1 AND recipe_id = $2;
      `;
  
      const existingRecipe = await pool.query(checkDuplicateQuery, [collectionId, recipeId]);
  
      if (existingRecipe.rows.length > 0) {
        return res.status(400).json({ error: 'Recipe already exists in the collection' });
      }
  
      const addRecipeQuery = `
        INSERT INTO collection_recipes (collection_id, recipe_id)
        VALUES ($1, $2)
        RETURNING *;
      `;
  
      const addedRecipe = await pool.query(addRecipeQuery, [collectionId, recipeId]);
  
      if (addedRecipe.rows.length === 0) {
        return res.status(404).json({ error: 'Recipe or collection not found' });
      }
  
      res.status(201).json({ message: 'Recipe added to the collection', addedRecipe: addedRecipe.rows[0] });
    } catch (error) {
      console.error('Error adding recipe to collection:', error);
      res.status(500).json({ error: 'An error occurred while adding the recipe to the collection.' });
    }
  };
  const deleteCollection = async (req, res) => {
    const { collectionId } = req.params;
  
    try {
      // Delete recipes associated with the collection from collection_recipes table
      const deleteCollectionRecipesQuery = `
        DELETE FROM collection_recipes
        WHERE collection_id = $1;
      `;
    
      await pool.query(deleteCollectionRecipesQuery, [collectionId]);
  
      // Now that references in collection_recipes are deleted, delete the collection
      const deleteCollectionQuery = `
        DELETE FROM collections
        WHERE id = $1
        RETURNING *;
      `;
  
      const collectionResult = await pool.query(deleteCollectionQuery, [collectionId]);
  
      if (collectionResult.rows.length === 0) {
        return res.status(404).json({ error: 'Collection not found' });
      }
  
      res.json({ message: 'Collection deleted successfully', collection: collectionResult.rows[0] });
    } catch (error) {
      console.error('Error deleting collection:', error);
      res.status(500).json({ error: 'An error occurred while deleting the collection.' });
    }
  };
  
  
  const getRecipesByCollectionId = async (req, res) => {
    const { collectionId } = req.params;
  
    try {
      const getRecipesQuery = `
        SELECT r.*
        FROM recipes r
        JOIN collection_recipes cr ON r.id = cr.recipe_id
        WHERE cr.collection_id = $1;
      `;
  
      const recipesResult = await pool.query(getRecipesQuery, [collectionId]);
  
      res.json(recipesResult.rows);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'An error occurred while fetching recipes.' });
    }
  };
  export default {
    createCollection,
    deleteCollection,
    getCollectionsByUserId,
    addRecipeToCollection,
    getRecipesByCollectionId
    };
    
