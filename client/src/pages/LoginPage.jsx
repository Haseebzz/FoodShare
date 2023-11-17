import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies} from "react-cookie"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const result = await axios.post('https://web103-finalproject.vercel.app/auth/login', {
            username,
            password
        })
        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userId);
        window.localStorage.setItem("username", result.data.username);
        navigate("/");
    } catch (error) {
        console.error(error);
    }
    };
  
    return (
      <div className="flex flex-col justify-center items-center h-screen">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username:
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password:
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login
      </button>
    </div>
  </form>
</div>
    );
}

export default LoginPage
