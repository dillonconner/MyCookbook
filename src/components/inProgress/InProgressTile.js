import React, { useState } from 'react';
import './InProgressTile.css';
import { useNavigate } from 'react-router-dom';

const InProgressTile = ({recipe}) => {

    const navigate = useNavigate();
    console.log(recipe);
    const {ingredients, steps} = recipe.versions.at(-1);
    
    const handleClick = (e) => {
        navigate(`in-progress/${recipe._id}`);
    }

    return (
        <div className='in-progress' onClick={handleClick}>
            <div className='image-container'>
                <img src={recipe.imgURL} alt=''/>
            </div>
            <div className='info'>
                <div className='about'>
                    <h2>{recipe.name}</h2>
                    <p>{recipe.description}</p>
                </div>
                <div className='directions'>
                    <div className='list'>
                        <h3>Ingredients</h3>
                        <ul>
                            {ingredients.map((item, id) => {
                                return <li key={id}>{item}</li>
                            })}
                        </ul>
                    </div>
                    <div className='list'>
                        <h3>Instructions</h3>
                        <ol>
                            {steps.map((item, id) => {
                                return <li key={id}>{item}</li>
                            })}
                        </ol>
                    </div>
                </div>
                
            </div>





            
            
        </div>
    )
}
export default InProgressTile