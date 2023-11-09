import { useState,useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage';
import CreatePage from './pages/CreatePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import RecipeInfoPage from './pages/RecipeInfoPage';
import CollectionsPage from './pages/CollectionsPage';
import EditPage from './pages/EditPage';
function App() {

 
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} /> 
          <Route path='/recipes/:id' element={<RecipeInfoPage/>} /> 
          <Route path= '/collection' element={<CollectionsPage/>} />
          <Route path= '/edit/:id' element={<EditPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
