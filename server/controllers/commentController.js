import { pool } from '../config/database.js';

const createComment = async (req, res) => {
 
  const {recipe_id, text, owner } = req.body;

  try {
    // Insert the comment into the comments table with recipe_id
    const createCommentQuery = `
      INSERT INTO comments (recipe_id, text, owner)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const commentResult = await pool.query(createCommentQuery, [recipe_id, text, owner]);

    res.status(201).json({ message: 'Comment added successfully', comment: commentResult.rows[0] });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'An error occurred while creating the comment.' });
  }
};



const getCommentsForRecipe = async (req, res) => {
  const { recipe_id } = req.params;

  try {
    // Fetch all comments for the specified recipe
    const getCommentsQuery = `
      SELECT * FROM comments
      WHERE recipe_id = $1;
    `;

    const commentResult = await pool.query(getCommentsQuery, [recipe_id]);

    res.json(commentResult.rows);
  } catch (error) {
    console.error('Error fetching comments for the recipe:', error);
    res.status(500).json({ error: 'An error occurred while fetching comments.' });
  }
};




const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    // Delete the comment from the comments table
    const deleteCommentQuery = `
      DELETE FROM comments
      WHERE id = $1
      RETURNING *;
    `;

    const commentResult = await pool.query(deleteCommentQuery, [commentId]);

    if (commentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully', comment: commentResult.rows[0] });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'An error occurred while deleting the comment.' });
  }
};




export default {
   createComment,
   getCommentsForRecipe,
   deleteComment
   };
   