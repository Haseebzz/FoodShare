import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const CreatePage = () => {
  const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: '',
        image: '',
        description: '',
        ingredients: '',
        instructions: '',
        category: '',
        owner: window.localStorage.username
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
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          // Send the recipe data to your backend API for creation.
          const response = await fetch('http://localhost:3001/recipes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
          });
    
          if (response.ok) {
            alert('Recipe created successfully!');
            navigate('/')
            // You can also redirect the user to another page or clear the form.
          } else {
            alert('Error creating the recipe.');
          }
        } catch (error) {
          console.error('Error creating the recipe:', error);
        }
      };
  return (
    <div className='max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-md'>
  <h1 className='text-2xl font-bold mb-6 text-red-500'>Create a New Recipe</h1>
  <form onSubmit={handleSubmit} className='space-y-4'>
    <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Title:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={recipe.name}
      onChange={handleInputChange}
      className='w-full border rounded-md px-3 py-2'
      required
    />

    <label htmlFor="image" className='block text-sm font-medium text-gray-700'>Image URL:</label>
    <input
      type="text"
      id="image"
      name="image"
      value={recipe.image}
      onChange={handleInputChange}
      className='w-full border rounded-md px-3 py-2'
      required
    />

    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description:</label>
    <textarea
      id="description"
      name="description"
      value={recipe.description}
      onChange={handleInputChange}
      className='w-full border rounded-md px-3 py-2'
      required
    />

    <label htmlFor="ingredients" className='block text-sm font-medium text-gray-700'>Ingredients (comma-separated):</label>
    <input
      type="text"
      id="ingredients"
      name="ingredients"
      value={recipe.ingredients}
      onChange={handleInputChange}
      className='w-full border rounded-md px-3 py-2'
      required
    />

    <label htmlFor="instructions" className='block text-sm font-medium text-gray-700'>Instructions (one per line with steps numbered in order):</label>
    <textarea
      id="instructions"
      name="instructions"
      value={recipe.instructions}
      onChange={handleInputChange}
      className='w-full border rounded-md px-3 py-2'
      required
    />

    <label htmlFor="category" className='block text-sm font-medium text-gray-700'>Select Category:</label>
    <select
      id="category"
      name="category"
      value={recipe.category}
      onChange={handleInputChange}
      className='w-full border rounded-md px-3 py-2'
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>

    <button type="submit" className='bg-red-500 text-white rounded-md px-4 py-2'>Create Recipe</button>
  </form>
</div>

  )
}

export default CreatePage