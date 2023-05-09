import './EditRecipe.css';
import backArrow from '../../util/back-arrow.png';

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import RecipeTile from "../../components/recipeTile/RecipeTile";
import RecipeInstructions from "../../components/recipeInstructions/RecipeInstructions";
import { loadRecipes, saveRecipe, removeRecipe } from "../../reducers/RecipeSlice";
import { addInProgress } from "../../reducers/InProgressSlice";

const EditRecipe = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const [ isEdit, setIsEdit ] = useState(false);
    
    const currRecipe = useSelector(state => state.recipes.recipes.find(r => r._id === recipeId));
    const [recipe, setRecipe] = useState(currRecipe ? currRecipe : {ingredients: [], steps: []});
    
    if(!currRecipe)  dispatch(loadRecipes());
    useEffect(() => {
        setRecipe(currRecipe);
    }, [currRecipe])

    const edit = (value, prop) => {
        const newRecipe = { ...recipe };
        newRecipe[prop] = value;
        setRecipe(newRecipe);
    }

    const handleEditBtn = (e) => setIsEdit(true);
    const handleSaveBtn = (e) => {
        dispatch(saveRecipe({recipeId:recipeId, recipe:recipe}));
        setIsEdit(false);
    }
    const handleToInProgressBtn = (e) => {
        const newInProgress = {
            ...recipe,
            versions:[{
                ingredients:recipe.ingredients,
                steps: recipe.steps
            }]
        };
        delete newInProgress.ingredients;
        delete newInProgress.steps;
        dispatch(addInProgress({recipe:newInProgress}));
        dispatch(removeRecipe({recipeId:recipeId}));
        navigate('/home');
    }
    const handleDeleteBtn = (e) => {
        dispatch(removeRecipe({recipeId:recipeId}));
        //confirm
        //check if it actually deleted
        navigate('/home');
    }

    if(!recipe) return <div>Loading</div>
    return (
        <div className="edit-recipe">
            <img className="back-btn" src={backArrow} alt="back" onClick={e => navigate('/home')} />
            <RecipeTile isEdit={isEdit} recipe={recipe} edit={edit} />
            <div className="buttons">
                {!isEdit ? 
                    <button onClick={handleEditBtn}>Edit</button> 
                    : 
                    <button onClick={handleSaveBtn}>Save</button>
                }
                {!isEdit && <button onClick={handleToInProgressBtn}>In Progress</button>}
                <button onClick={handleDeleteBtn}>Delete</button>
            </div>
            <div className="instructions-container">
                <RecipeInstructions
                    ingredients={recipe.ingredients} 
                    steps={recipe.steps}
                    isEdit={isEdit}
                    edit={edit} />
            </div>
            
        </div>
    )
}
export default EditRecipe