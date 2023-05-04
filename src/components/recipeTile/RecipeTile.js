import React, { useState } from 'react';
import './RecipeTile.css';
import uploadFileToBlob, { makeAzureUrl, isStorageConfigured } from '../../util/azureStorage';
import logo from '../../util/Loading_icon.gif';
import noImage from '../../util/no_image_found.jpg';

const RecipeTile = ({recipe, isEdit, edit}) => {

    const [ file, setFile ] = useState('No file selected');
    const [ currImg, setCurrImg ] = useState(makeAzureUrl(recipe._id));
    const [ tagValue, setTagValue ] = useState('');
    
    const handleImageUpload = async (e) => {
        if(isStorageConfigured){
            setCurrImg(logo);
            await uploadFileToBlob(file, recipe._id);
            setCurrImg(makeAzureUrl(recipe._id));
        }
    }
    const handleTagInput = (e) => {
        if(e.key === 'Enter'){
            edit([...recipe.tags, tagValue], 'tags');
            setTagValue('');
        }
    }
    const handleRemoveTag = (e) => {
        const newTags = recipe.tags.filter((t) => !t.includes(e.target.value));
        edit(newTags, 'tags');
    }

    return (
        <div className='recipe-tile' >
            <div className='image'>
                <img src={currImg} onError={(e) => e.target.src = noImage} alt='food'/>
                {isEdit && 
                    <div className='file-upload'>
                        <input className='file-select'
                            type='file' 
                            onChange={(e) => setFile(e.target.files[0])}
                            accept='image/png, image/jpeg'
                            multiple={false} />
                        <button className='upload-btn' onClick={handleImageUpload}>Upload Image</button>
                    </div>
                }
            </div>

            {!isEdit ? 
            <div className='info'>
                <h3 className='title'>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <div className='details'>
                    <p>{`Cook Time: ${recipe.time}`}</p>
                    <p>{`Servings: ${recipe.servings}`}</p>
                    <p>Tags:</p>
                    {recipe.tags.map((t) => <button className='tag'>{t}</button>)}
                </div>
            </div>
            :
            <div className='info'>
                <textarea className='title' rows={2} value={recipe.name} onChange={e => edit(e.target.value, 'name')}/>
                <textarea rows={5} value={recipe.description} onChange={e => edit(e.target.value, 'description')}/>
                <div className='details'> 
                    <label>Cook Time: </label>
                    <input className='time-input' type='text' value={recipe.time} onChange={e => edit(e.target.value, 'time')}/>
                    <br/>
                    <label>Servings: </label>
                    <input className='serving-input' type='number' value={recipe.servings} onChange={e => edit(e.target.value, 'servings')}/>
                    <div className='tags'>
                        <p>Tags:</p>
                        <input 
                        className='tag-input' 
                        placeholder='Tag Name' 
                        value={tagValue}
                        onChange={e => setTagValue(e.target.value.toLowerCase())}
                        onKeyDown={handleTagInput} />
                        {recipe.tags.map((t) => <button className='tag removable-tag' onClick={handleRemoveTag} value={t}>{t}</button>)}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default RecipeTile