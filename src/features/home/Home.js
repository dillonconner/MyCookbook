import React, { useEffect, useState } from "react";
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes, loadRecipes } from '../../reducers/RecipeSlice';
import { selectInProgress, loadInProgress, addInProgress } from "../../reducers/InProgressSlice";

import InProgressTile from "../../components/inProgress/InProgressTile";
import RecipePreview from "../../components/recipePreview/RecipePreview";
import UserCard from "../../components/profile/UserCard";

const Home = () => {
    const dispatch = useDispatch();
    const inProgress = useSelector(selectInProgress);
    const recipes = useSelector(selectRecipes);
    
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(loadRecipes());
        dispatch(loadInProgress());
    }, []);


    const handleNewRecipeBtn = () => {
        const newInProgress = {
            name: 'New Recipe',
            description: 'Enter Recipe Description',
            imgURL: '',
            time: '',
            tags: [],
            servings: 1,
            versions: [{
                ingredients: ['enter Ingredients'], 
                steps: ['enter Steps']
            }]};
        dispatch(addInProgress({recipe: newInProgress}));
        
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="home">
            <div className="preview-heading">
                <h2>In Progress</h2>
                <button className="new-recipe" onClick={handleNewRecipeBtn}>New Recipe</button>
            </div>
            <div className="preview-area">
                {inProgress.length > 0 ? 
                    inProgress.map((r, id) => <InProgressTile key={id} recipe={r}/>)
                    :
                    <h2>No In Progress Recipes</h2>
                }
            </div>
            <div className="preview-heading recipes">
                <h2>Finished Recipes</h2>
                <input className="search-bar" 
                type="text" 
                placeholder="search for recipe" 
                value={searchTerm}
                onChange={handleSearchChange} />
            </div>
            
            <div className="preview-area">
                {recipes.length > 0 ?
                    recipes.map((r, id) => <RecipePreview key={id} recipe={r}/>)
                    :
                    <h2>No Finished Recipes Found</h2>}
            </div>
        </div>
    )
}
export default Home