import React, { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://foodshare-f5xd0ahh2-haseebzz.vercel.app/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData), // Sending registration data as JSON
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        // Registration was successful; you can handle the response data here
        console.log('Registration successful:', data);
  
        // Redirect the user to another page (e.g., a login page) after successful registration
        // You can use a routing library for this.
      } else {
        // Registration failed; handle errors and display appropriate messages
        console.error('Registration failed:', response.status, response.statusText);
        // You can display an error message to the user on the registration page.
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full max-w-md bg-white rounded p-4 shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
