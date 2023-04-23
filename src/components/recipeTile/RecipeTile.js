import React from 'react';
import './RecipeTile.css';

const RecipeTile = ({recipe, isEdit, edit}) => {

    return (
        <div className='recipe-tile' >
            {!isEdit ? 
            <div className='info'>
                <div className='user-info'>
                    <p>image</p>
                    <h4>Username</h4>
                </div>
                <h3 className='title'>{recipe.name}</h3>
                <p>{`Cook Time: ${recipe.time}`}</p>
                <p>{`Servings: ${recipe.servings}`}</p>
                <p>Tags:</p>
            </div>
            :
            <div className='info'>
                <textarea className='title' rows={3} cols={5} value={recipe.name} onChange={e => edit(e.target.value, 'name')}/>
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
            }
            <div className='image'>
                <img src={recipe.imgURL} alt=''/>
            </div>
            <div className='info'>
                <h3>Description</h3>
                {!isEdit ? <p>{recipe.description}</p> : <textarea rows={10} value={recipe.description} onChange={e => edit(e.target.value, 'description')}/>}
            </div>
        </div>
    )
}
export default RecipeTile