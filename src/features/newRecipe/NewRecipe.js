import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addInProgress } from "../../reducers/InProgressSlice";

const NewRecipe = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNewScratch = () => {
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
        navigate(-1);
    }
    const handleNewStarter = () => {
        //add parsed starter recipe to current recipe state
        //change location to edit page
    }
    
    //change buttons to links or routes
    return (
        <div className="new-recipe">
            <h1>Create new Recipe</h1>
            <button onClick={handleNewScratch}>Start from Scratch</button>
            <p>or</p>
            <h2>Search for Starter</h2>
            <input placeholder="search"/>
            <div className="starters">
                <button onClick={handleNewStarter}>placeholder recipe</button>
                <button>placeholder recipe</button>
                <button>placeholder recipe</button>
            </div>
            
        </div>
    )
}
export default NewRecipe