import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
const RecipeInfoPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); // For adding a new comment
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams(); // Use useParams to access route parameters
  const [cookies, setCookie] = useCookies(['access_token']);
  //console.log(id)
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch the recipe data when the component mounts
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3001/recipes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else {
          const errorText = await response.text(); // Get the error response text
          console.error('Error fetching recipe:', errorText);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/comments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          const errorText = await response.text();
          console.error('Error fetching comments:', errorText);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchRecipe();
    fetchComments();
  }, []); // Use Id from useParams in the dependency array
  const handleAddComment = async () => {
    // Make a POST request to add a new comment
    try {
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe_id: id, text: newComment, owner: window.localStorage.username  }), // Replace 'current_user' with the actual owner
      });

      if (response.ok) {
        // Reload the comments after adding a new comment
        const response = await fetch(`http://localhost:3001/comments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } else {
        alert('Error adding the comment.');
      }
    } catch (error) {
      console.error('Error adding the comment:', error);
    }
  };
  if (!recipe) {
    return <div>Loading...</div>;
  }
  const handleDelete = async ( id ) => {
        
    try {
      // Send the recipe data to your backend API for creation.
      const response = await fetch(`http://localhost:3001/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    
      });

      if (response.ok) {
        alert('Recipe Deleted successfully!');
        navigate('/')
        // You can also redirect the user to another page or clear the form.
      } else {
        alert('Error deleting the recipe.');
      }
    } catch (error) {
      console.error('Error deleting the recipe:', error);
    }
  }
  const handleEdit = async ( id ) => {
        
    try {
      // Send the recipe data to your backend API for creation.
      const response = await fetch(`http://localhost:3001/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
    
      });

      if (response.ok) {
        alert('Recipe Edited successfully!');
        navigate('/')
        // You can also redirect the user to another page or clear the form.
      } else {
        alert('Error editing the recipe.');
      }
    } catch (error) {
      console.error('Error editing the recipe:', error);
    }
  }
  const handleDeleteComment = async (commentId) => {
    // Make a DELETE request to delete the comment
    try {
      const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Reload the comments after deleting a comment
        const newComments = comments.filter((comment) => comment.id !== commentId);
        setComments(newComments);
      } else {
        alert('Error deleting the comment.');
      }
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
    <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
    <p className="mb-4">{recipe.description}</p>
    <img src={recipe.image} alt={recipe.name} className="w-full h-auto mb-4" />
  
    <div className="mb-4">
      <h2 className="text-xl font-bold">Ingredients:</h2>
      <p>{recipe.ingredients}</p>
    </div>
  
    <div className="mb-4">
      <h2 className="text-xl font-bold">Instructions:</h2>
      <p>{recipe.instructions}</p>
    </div>
  
    <div className="mb-4">
      <h2 className="text-xl font-bold">Category:</h2>
      <p>{recipe.category}</p>
    </div>
  
    <p className="mb-4">Owner: {recipe.owner}</p>
  
    {recipe.owner === window.localStorage.username && (
      <div className="mb-4 flex justify-between">
        <Link to={`/edit/${recipe.id}`}>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                Edit
              </button>
            </Link>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleDelete(recipe.id)}
        >
          Delete
        </button>
      </div>
    )}
  
    <h1 className="text-3xl font-bold mb-4">Comments</h1>
  
    {/* Add a comment form */}
    <div className="mb-4">
      {cookies.access_token ? (
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-2 flex-1"
          />
          <button
            onClick={handleAddComment}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Comment
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Please log in to add comments.</p>
      )}
    </div>
  
    {/* Display existing comments */}
{comments.map((comment) => (
  <div key={comment.id} className="bg-white p-4 rounded-md shadow-md mb-4">
    <p className="text-lg mb-2">Comment: {comment.text}</p>
    <p className="text-gray-500">Owner: {comment.owner}</p>
    {comment.owner === window.localStorage.username && (
      <button
        onClick={() => handleDeleteComment(comment.id)}
        className="text-red-500 mt-2 block"
      >
        Delete Comment
      </button>
    )}
  </div>
))}

  </div>
  

  
  );
};

export default RecipeInfoPage;
