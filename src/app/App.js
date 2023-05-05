import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProvideAuth, RequireAuth } from '../hooks/use-auth';

import Header from '../components/header/Header';
import Login from '../features/login/Login';
import Home from '../features/home/Home';
import NewRecipe from '../features/newRecipe/NewRecipe';
import EditRecipe from '../features/editRecipe/EditRecipe';
import EditInProgress from '../features/editInProgress/EditInProgress';

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <Header />
        <Routes>
          <Route path='login' element={<Login/>} />
          
          <Route path='home' element={<RequireAuth><Home /></RequireAuth>} />
          <Route path='recipe/:recipeId' element={<RequireAuth><EditRecipe/></RequireAuth>} />
          <Route path='in-progress/:recipeId' element={<RequireAuth><EditInProgress/></RequireAuth>} />
          <Route path='new-recipe' element={<RequireAuth><NewRecipe/></RequireAuth>} />
        </Routes>
      </ProvideAuth>
    </div>
  );
}

export default App;
