import React from 'react';
import './InProgressTile.css';
import { useNavigate } from 'react-router-dom';
import { makeAzureUrl } from '../../util/azureStorage';
import noImage from '../../util/no_image_found.jpg';

const InProgressTile = ({recipe, tileNum}) => {

    const navigate = useNavigate();
    const {ingredients, steps} = recipe.versions.at(-1);
    
    const handleClick = (e) => {
        navigate(`/in-progress/${recipe._id}`);
    }
    const handleImgClick = (e) => {
        if(window.innerWidth < 600){
            const tiles = document.getElementsByClassName('image-container');
            Array.from(tiles).forEach((t) => {t.style.display = 'flex'});
            tiles[tileNum].style.display = 'none';

        }else {
            navigate(`/in-progress/${recipe._id}`);
        }
    }

    return (
        <div className='in-progress'>
            <div className='image-container' onClick={handleImgClick}>
                <img src={makeAzureUrl(recipe._id)} onError={(e) => e.target.src = noImage} alt='food'/>
            </div>
            <div className='info' onClick={handleClick}>
                <div className='about'>
                    <h2 className='title'>{recipe.name}</h2>
                    <p className='description'>{recipe.description}</p>
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