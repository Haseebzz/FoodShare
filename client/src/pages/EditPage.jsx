import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPage = () => {
  const { id } = useParams(); // Access the recipe ID from the URL

  const [recipe, setRecipe] = useState({
    image: '',
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: '',
  });
  const categories = [
    { id: 1, name: 'Breakfast recipes' },
    { id: 2, name: 'Lunch recipes' },
    { id: 3, name: 'Dinner recipes' },
    { id: 4, name: 'Appetizer recipes' },
    { id: 5, name: 'Salad recipes' },
    { id: 6, name: 'Main-course recipes' },
    { id: 7, name: 'Side-dish recipes' },
    { id: 8, name: 'Baked-goods recipes' },
    { id: 9, name: 'Dessert recipes' },
    { id: 10, name: 'Snack recipes' },
  ];
  useEffect(() => {
    // Fetch the recipe data for editing
    const fetchRecipeForEdit = async () => {
      try {
        const response = await fetch(`https://foodshare-f5xd0ahh2-haseebzz.vercel.app/recipes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else {
          console.error('Error fetching recipe for edit:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipe for edit:', error);
      }
    };

    fetchRecipeForEdit();
  }, [id]);

  // Handle form submission for editing the recipe
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the updated recipe data to your backend API for editing
      const response = await fetch(`http://localhost:3001/recipes/${id}`, {
        method: 'PUT', // Use the appropriate HTTP method (e.g., PUT) for editing
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        alert('Recipe updated successfully!');
        // Redirect the user to the recipe details page or another appropriate page
      } else {
        alert('Error editing the recipe.');
      }
    } catch (error) {
      console.error('Error editing the recipe:', error);
    }
  };

  // Handle input changes for recipe properties
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
  <h1 className="text-3xl font-bold mb-4">Edit Recipe</h1>
  <form onSubmit={handleEditSubmit} className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-600">
        Title:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={recipe.name}
        onChange={handleInputChange}
        required
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
    <div>
      <label htmlFor="image" className="block text-sm font-medium text-gray-600">
        Image URL:
      </label>
      <input
        type="text"
        id="image"
        name="image"
        value={recipe.image}
        onChange={handleInputChange}
        required
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-600">
        Description:
      </label>
      <textarea
        id="description"
        name="description"
        value={recipe.description}
        onChange={handleInputChange}
        required
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
    <div>
      <label htmlFor="ingredients" className="block text-sm font-medium text-gray-600">
        Ingredients (comma-separated):
      </label>
      <input
        type="text"
        id="ingredients"
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleInputChange}
        required
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
    <div>
      <label htmlFor="instructions" className="block text-sm font-medium text-gray-600">
        Instructions (one per line):
      </label>
      <textarea
        id="instructions"
        name="instructions"
        value={recipe.instructions}
        onChange={handleInputChange}
        required
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-600">
        Select Category:
      </label>
      <select
        id="category"
        name="category"
        value={recipe.category}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Save Changes
      </button>
    </div>
  </form>
</div>

  );
};

export default EditPage;
