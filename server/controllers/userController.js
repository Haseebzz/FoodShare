import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';

const registerUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username is already taken
      const userQuery = 'SELECT * FROM people WHERE username = $1';
      const userCheckResult = await pool.query(userQuery, [username]);
  
      if (userCheckResult.rows.length > 0) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Insert the user into the people table
      const insertUserQuery = `
        INSERT INTO people (username, password, accesstoken)
        VALUES ($1, $2, $3)
        RETURNING id;
      `;
  
      // Create a JWT token
      const token = jwt.sign({ username }, 'your-secret-key');
  
      const registrationResult = await pool.query(insertUserQuery, [username, hashedPassword, token]);
      const userId = registrationResult.rows[0].id;
  
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
  };
  
  const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const userQuery = 'SELECT id, username, password, accesstoken FROM people WHERE username = $1';
      const loginResult = await pool.query(userQuery, [username]);
  
      if (loginResult.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const user = loginResult.rows[0];
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ userId: user.id }, 'your-secret-key');
  
      res.json({
        message: 'Login successful',
        userId: user.id,
        username: user.username,
        token,
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
  };
  

export default {
  registerUser,
  loginUser,
};
