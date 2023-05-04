import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '../components/header/Header';
import Login from '../features/login/Login';
import Home from '../features/home/Home';
import NewRecipe from '../features/newRecipe/NewRecipe';
import EditRecipe from '../features/editRecipe/EditRecipe';
import EditInProgress from '../features/editInProgress/EditInProgress';

function App() {

  const auth = localStorage.getItem('token');

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='login' element={<Login/>} />
        
        <Route path='' element={auth ? <Home /> : <Navigate to='/login'/>} />
        <Route path='recipe/:recipeId' element={auth ? <EditRecipe/> : <Navigate to='/login'/>} />
        <Route path='in-progress/:recipeId' element={auth ? <EditInProgress/> : <Navigate to='/login'/>} />
        <Route path='new-recipe' element={auth ? <NewRecipe/> : <Navigate to='/login'/>} />

      </Routes>

    </div>
  );
}

export default App;
