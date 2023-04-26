import React from 'react';
import './RecipeTile.css';

const RecipeTile = ({recipe, isEdit, edit}) => {

    return (
        <div className='recipe-tile' >
            <div className='image'>
                <img src={recipe.imgURL} alt=''/>
            </div>

            {!isEdit ? 
            <div className='info'>
                <h3 className='title'>{recipe.name}</h3>
                
                <p>{recipe.description}</p>
                
                <div className='details'>
                    <p>{`Cook Time: ${recipe.time}`}</p>
                    <p>{`Servings: ${recipe.servings}`}</p>
                    <p>Tag:</p>
                </div>
            </div>
            :
            <div className='info'>
                <textarea className='title' rows={2} value={recipe.name} onChange={e => edit(e.target.value, 'name')}/>
                <textarea rows={5} value={recipe.description} onChange={e => edit(e.target.value, 'description')}/>
                
                <div className='details'> 
                    <label>Cook Time: </label>
                    <input type='text' value={recipe.time} onChange={e => edit(e.target.value, 'time')}/>
                    <br/>
                    
                    <label>Servings: </label>
                    <input type='number' value={recipe.servings} onChange={e => edit(e.target.value, 'servings')}/>
                    
                    <div className='tags'>
                        <p>Tags:</p>
                        <button>Breakfast</button>
                        <button>Lunch</button>
                        <button>Dinner</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default RecipeTile