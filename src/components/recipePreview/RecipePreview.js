import React from 'react';
import './RecipePreview.css';
import { Link } from 'react-router-dom';

const RecipePreview = ({recipe}) => {
    return (
        <Link to={`recipe/${recipe._id}`}>
        <div className='recipe-preview' >
            <div className='image'>
                <img src={recipe.imgURL} alt=''/>
            </div>
            <div className='info'>
                <h3 className='title'>{recipe.name}</h3>
                <p>{`Cook Time: ${recipe.time}`}</p>
                <p>{`Servings: ${recipe.servings}`}</p>
                <p>Tags:</p>
            </div>
            
        </div>
        </Link>
        
    )
}
export default RecipePreview