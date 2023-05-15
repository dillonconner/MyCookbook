import React from 'react';

import './RecipeInstructions.css';

const RecipeInstructions = ({isEdit, ingredients, steps, additions, deletions, edit }) => {

    const handleIngredientChange = (e) => {
        let newIngredients = [...ingredients];
        const index = parseInt(e.target.getAttribute('data-key'));
        newIngredients[index] = e.target.value;
        edit(newIngredients, 'ingredients');
    }
    const handleStepChange = (e) => {
        let newSteps = [...steps];
        const index = parseInt(e.target.getAttribute('data-key'));
        newSteps[index] = e.target.value;
        edit(newSteps, 'steps');
    }
    const handleRemoveListItem = (e) => {
        const toRemove = e.target.getAttribute('to-remove');
        const list = e.target.getAttribute('list');
        let newItems = undefined;
        if(list === 'ingredients') newItems = ingredients.filter((item) =>  item !== toRemove );
        else newItems = steps.filter((item) =>  item !== toRemove );
        
        edit(newItems, list);
    }


    return (
        <div className='recipe-instructions'>
            {!isEdit ? 
                <div className='ingredients display'>
                    <h3>Ingredients</h3>
                    <ul>
                        {
                        ingredients.map((ingredient, id) => {
                            return <li className={additions?.ingredients.includes(ingredient) ? 'addedItem' :undefined} key={id}>{ingredient}</li>
                        })
                        }
                        
                    </ul>
                    
                    {deletions && deletions.ingredients.length > 0 &&
                        <div>
                            <p className='removedHeader'>Removed Ingredients</p>
                            <ul>
                                {deletions.ingredients.map((ingredient, id) => <li className='removedItem' key={id}>{ingredient}</li>)}
                            </ul>
                        </div>
                    }
                </div> 
                : 
                <div className='ingredients edit'>
                    <h3>Ingredients</h3>
                    {ingredients.map((ingredient, id) => {
                        return ( <li key={id}>
                                    <input data-key={id} value={ingredient} onChange={handleIngredientChange} />
                                    <button className='removeItem' to-remove={ingredient} list='ingredients' onClick={handleRemoveListItem}>-</button>
                                </li>)
                    })}
                    <button className='addItem' onClick={(e) => edit([...ingredients, ''], 'ingredients')}>+</button>
                    
                </div> 
            }
            {!isEdit ? 
                <div className='steps display'>
                    <h3>Instructions</h3>
                    <ol>
                        {steps.map((step, id) => {
                            return <li className={additions?.steps.includes(step) ? 'addedItem' : undefined} key={id}>{step}</li>
                        })}
                    </ol>
                    {deletions?.steps.length > 0 &&
                        <div>
                            <p className='removedHeader'>Removed Steps</p>
                            <ol>
                                {deletions.steps.map((step, id) => <li className='removedItem' key={id}>{step}</li>)}
                            </ol>
                            
                        </div>
                    }
                </div> 
                : 
                <div className='steps edit'>
                    <h3>Instructions</h3>
                    {steps.map((step, id) => {
                        return (<div key={id} className='step-li'>
                                    <p>{id + 1}.</p>
                                    <textarea rows={3} data-key={id} value={step} onChange={handleStepChange} />
                                    <button className='removeItem' to-remove={step} list='steps' onClick={handleRemoveListItem}>-</button>
                                </div>)
                    })}
                    <button className='addItem' onClick={(e) => edit([...steps, ''], 'steps')}>+</button>
                </div>
            }       
        </div>
        
    )
}
export default RecipeInstructions
