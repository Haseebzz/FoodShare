import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [recipes, setRecipes] = useState([]);
 
  const userId = window.localStorage.userID; // Replace with your user ID
  
  // Fetch collections by user ID
  useEffect(() => {
    axios.get(`http://localhost:3001/collections/${userId}`)
      .then(response => {
        setCollections(response.data);
      })
      .catch(error => {
        console.error('Error fetching collections:', error);
      });
  }, [userId]);
  const createNewCollection = async () => {
    try {
      const name = prompt('Enter collection name:');
      const description = prompt('Enter collection description:');
      const userId = window.localStorage.userID; // Replace with your user ID

      const response = await axios.post('http://localhost:3001/collections', {
        name,
        description,
        userId,
      });

      if (response.status === 201) {
        // If collection creation is successful, update the collections state
        setCollections([...collections, response.data.collection]);
        alert('Collection created successfully!');
      } else {
        alert('Error creating collection.');
      }
    } catch (error) {
      console.error('Error creating collection:', error);
      alert('Error creating collection. Please try again.');
    }
  };

  // Function to fetch recipes by collection ID
  const fetchRecipesByCollectionId = (collectionId) => {
    axios.get(`http://localhost:3001/collections/recipe/${collectionId}`)
      .then(response => {
        setRecipes(response.data);
        console.log(response.data,collectionId)
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  };

  const deleteCollection = async (collectionId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/collections/${collectionId}`);

      if (response.status === 200) {
        // If deletion is successful, update the collections state by removing the deleted collection
        const updatedCollections = collections.filter(collection => collection.id !== collectionId);
        setCollections(updatedCollections);
        alert('Collection deleted successfully!');
        window.location.reload()
      } else {
        alert('Error deleting collection.');
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
      alert('Error deleting collection. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Collections</h1>
    <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        onClick={createNewCollection}
      >
        Create New Collection
      </button>
    {collections.length === 0 ? (
      <p className="text-gray-500">No collections found</p>
    ) : (
      <ul className="grid grid-cols-2 gap-4">
        {collections.map(collection => (
          <li key={collection.id} className="border rounded p-4">
             <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                onClick={() => deleteCollection(collection.id)}
              >
                Delete Collection
              </button>
            <p className='font-bold text-gray-500'>id: {collection.id}</p>
            <div className="font-bold">{collection.name}</div>
            <div className="text-gray-600">{collection.description}</div>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => fetchRecipesByCollectionId(collection.id)}
            >
              View Recipes
            </button>
          </li>
        ))}
      </ul>
    )}
    
    <h2 className="text-2xl font-bold mt-8">Recipes</h2>
    <ul className="grid grid-cols-2 gap-4">
      {recipes.map(recipe => (
        <li key={recipe.id} className="border rounded p-4">
          <div className="font-bold">Name: {recipe.name}</div>
          <img className=' w-[300px] h-[300px]' src={recipe.image} alt="/" />
          <p>Owner: {recipe.owner}</p>
          <Link to={`/recipes/${recipe.id}`}>
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
           
          >
            More Details
          </button>
          </Link>
        </li>
      ))}
    </ul>
  

  </div>
  
  );
};

export default CollectionsPage;
