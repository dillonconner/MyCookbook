import React from 'react';
import './RecipePreview.css';
import { Link } from 'react-router-dom';
import { makeAzureUrl } from '../../util/azureStorage';
import noImage from '../../util/no_image_found.jpg';

const RecipePreview = ({recipe}) => {
    return (
        <Link to={`/recipe/${recipe._id}`}>
        <div className='recipe-preview' >
            <div className='image'>
            <img src={makeAzureUrl(recipe._id)} onError={(e) => e.target.src = noImage} alt='food'/>
            </div>
            <div className='info'>
                <h3 className='title'>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <div className='cook-serve'>
                    <p>{`Cook Time: ${recipe.time}`}</p>
                    <p>{`Servings: ${recipe.servings}`}</p>
                </div>
                <div className='tags'>
                    <p>Tags:</p>
                    {recipe.tags.length > 0 ? 
                    recipe.tags.map((t) => <button className='tag'>{t}</button>)
                    :
                    <p>No tags</p>
                    }
                </div>
            </div>
            
        </div>
        </Link>
        
    )
}
export default RecipePreview