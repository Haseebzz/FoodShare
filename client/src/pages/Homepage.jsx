import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'

const Homepage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Step 1: Selected category state
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(8); // Adjust the number of recipes per page as needed
  useEffect(() => {
    // Fetch car combinations data from your API
    fetch('http://localhost:3001/recipes')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      })
      .catch((error) => {
        console.error('Error fetching car combinations:', error);
      });
  }, [currentPage]);
  const filterRecipesByCategory = (category) => {
    if (category === selectedCategory || category === "") {
      // If the same category or "Select a category" is clicked again, clear the filter
      setSelectedCategory('');
      fetchRecipes(); // Fetch all recipes again
    }
    if (category === selectedCategory) {
      // If the same category is clicked again, clear the filter
      setSelectedCategory('');
      fetchRecipes(); // Fetch all recipes again
    } else {
      setSelectedCategory(category);
      // Fetch recipes for the selected category
      fetch(`https://foodshare-f5xd0ahh2-haseebzz.vercel.app/recipes/filter/${category}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            // Check if data is an array before setting recipes
            setRecipes(data);
          } else {
            // If data is not an array, set recipes to an empty array
            setRecipes([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching recipes by category:', error);
        });
    }
  };
  
  const fetchRecipes = () => {
    fetch('http://localhost:3001/recipes')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };
  const handleDelete = async (id) => {
    try {
      // Send the recipe data to your backend API for creation.
      const response = await fetch(`https://foodshare-f5xd0ahh2-haseebzz.vercel.app/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Recipe Deleted successfully!');
        window.location.reload();
        navigate('/');
        // You can also redirect the user to another page or clear the form.
      } else {
        alert('Error deleting the recipe.');
      }
    } catch (error) {
      console.error('Error deleting the recipe:', error);
    }
  };

  const handleSearch = () => {
    // Fetch recipes based on the search query
    fetch(`https://foodshare-f5xd0ahh2-haseebzz.vercel.app/recipes/search?name=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };
  const categories = [
    'Breakfast recipes',
    'Lunch recipes',
    'Dinner recipes',
    'Appetizer recipes',
    'Salad recipes',
    'Main-course recipes',
    'Side-dish recipes',
    'Baked-goods recipes',
    'Dessert recipes',
    'Snack recipes',
  ];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <div>
        <h1 className=' text-center text-4xl md:text-6xl sm:text-5xl font-bold py-4 italic text-yellow-500'>FoodShare</h1>
        <div className='flex md:items-center md:w-[700px] md:mx-auto sm:w-[500px] '>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md'
          type="text"
          placeholder="Search by recipe name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='bg-[#00df9a] text-black rounded-md font-medium px-4 ml-2  ' onClick={handleSearch}><AiOutlineSearch size={40} /></button>
      </div>
      </div>
     <div className='md:w-[700px] sm:w-[400px] w-[300px] mx-auto m-10'>
      <select
  value={selectedCategory}
  onChange={(e) => filterRecipesByCategory(e.target.value)}
  className="p-3 flex w-full rounded-md text-black border-4 "
>
  <option value="">Select a category</option>
  {categories.map((category) => (
    <option key={category} value={category}>
      {category}
      {Array.isArray(recipes) && recipes.length > 0 ? (
        recipes.some((recipe) => recipe.category === category) ? (
          <span> ({recipes.filter((recipe) => recipe.category === category).length} recipes)</span>
        ) : (
          <span> (No recipes)</span>
        )
      ) : (
        <span> (No recipes)</span>
      )}
    </option>
  ))}
</select>
</div>

<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
{recipes &&
  recipes
    .slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage)
    .map((recipe) => (
      <div key={recipe.id} className='bg-white p-4 rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg'>
        <strong className='text-xl font-bold mb-2'>{recipe.name}</strong>
        <p className='text-gray-600 mb-2 mt-4'>{recipe.description}</p>
        <p className='text-gray-500 mb-2'>Owner: {recipe.owner}</p>
        <img src={recipe.image} alt={recipe.name} className='w-full h-48 object-cover mb-2 rounded-md' />
        <Link to={`/recipes/${recipe.id}`}>
          <button className='bg-red-800 text-white rounded-md font-medium w-full py-2 hover:bg-red-700 transition-colors duration-300'>
            More details
          </button>
        </Link>
        {recipe.owner === window.localStorage.username && (
          <div className='mt-2'>
            <Link to={`/edit/${recipe.id}`}>
              <button className='bg-red-800 text-white rounded-md font-medium w-full py-2 hover:bg-red-700 transition-colors duration-300'>
                Edit
              </button>
            </Link>
            <button
              onClick={() => handleDelete(recipe.id)}
              className='bg-gray-500 text-white rounded-md font-medium w-full mt-2 py-2 hover:bg-gray-600 transition-colors duration-300'
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ))}


{/* Pagination controls */}
{/* Pagination controls */}
<div className='flex justify-center items-center mt-8'>
  {pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => paginate(number)}
      className={`px-3 py-1 mx-1 rounded-md text-sm h-[50px] w-[50px] ${
        number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'
      }`}
    >
      {number}
    </button>
  ))}
</div>


</ul>

    </div>
  );
};

export default Homepage;
