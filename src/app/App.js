import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../components/header/Header';
import Login from '../features/login/Login';
import Home from '../features/home/Home';
import NewRecipe from '../features/newRecipe/NewRecipe';
import EditRecipe from '../features/editRecipe/EditRecipe';
import EditInProgress from '../features/editInProgress/EditInProgress';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='signup' element={<Login isSignUp={true} />} />
        <Route path='login' element={<Login isSignUp={false} />} />
        
        <Route path='' element={<Home />} />
        <Route path='recipe/:recipeId' element={<EditRecipe/>} />
        <Route path='in-progress/:recipeId' element={<EditInProgress />} />
        <Route path='new-recipe' element={<NewRecipe/>} />

      </Routes>

    </div>
  );
}

export default App;
