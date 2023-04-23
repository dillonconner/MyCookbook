import React, { useState } from 'react';
import './InProgressTile.css';
import { Link } from 'react-router-dom';

const InProgressTile = ({recipe}) => {
    const [optionsHidden, setOptionsHidden] = useState(true);

    const {ingredients, steps} = recipe.versions.at(-1);
    
    return (
        <div className='in-progress' >
            <div className='description'>
                <h3>{recipe.name}</h3>
                <img src={recipe.imgURL} alt=''/>
                <p>{recipe.description}</p>
            </div>
            <div className='ingredients'>
                <h3>Ingredients</h3>
                <ul>
                    {ingredients.map((item, id) => {
                        return <li key={id}>{item}</li>
                    })}
                </ul>
                
            </div>
            <div className='instructions'>
                <h3>Instructions</h3>
                <ol>
                    {steps.map((item, id) => {
                        return <li key={id}>{item}</li>
                    })}
                </ol>
            </div>
            {!optionsHidden ? 
            <div className='options' onMouseLeave={() => setOptionsHidden(true)}>
                <Link to={`in-progress/${recipe._id}`}><button>Versions</button></Link>
                <button>Finalize</button>
                <button>Delete</button>
            </div> :
            <div className='icon'  
                onMouseEnter={() => setOptionsHidden(false)} >
                <p>|||</p>
            </div>
            
            }
            
        </div>
    )
}
export default InProgressTile