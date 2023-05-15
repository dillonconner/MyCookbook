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
    const handleTitleChange = (e) => {
        const {value, maxLength} = e.target;
        const title = value.slice(0, maxLength); 
        edit(title, 'name');
    }
    const handleDescChange = (e) => {
        
        const {value, maxLength} = e.target;
        const description = value.slice(0, maxLength); 
        edit(description, 'description')
    }
    const handleServingChange= (e) => {
        const {value, max} = e.target;
        if(value > max) {
            edit(99, 'servings');
        }else {
            edit(e.target.value, 'servings');
        }
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
                <p className='description'>{recipe.description}</p>
                <div className='details'>
                    <p>{`Cook Time: ${recipe.time}`}</p>
                    <p>{`Servings: ${recipe.servings}`}</p>
                    <div className='tags'>
                        <p>Tags:</p>
                        {recipe.tags.map((t, id) => <button className='tag' key={id}>{t}</button>)}
                    </div>
                    
                </div>
            </div>
            :
            <div className='info'>
                <textarea 
                    className='title' 
                    rows={2} 
                    value={recipe.name}
                    maxLength='50' 
                    onChange={handleTitleChange}/>
                <div className="chCount"><span>{50 - recipe.name.length}</span><span>/ 50</span></div>
                <textarea
                    className='description' 
                    rows={5} 
                    value={recipe.description}
                    maxLength='300'  
                    onChange={handleDescChange}/>
                <div className="chCount"><span>{300 - recipe.description.length}</span><span>/ 300</span></div>
                <div className='details'> 
                    <div className='detail-input'>
                        <p htmlFor='cook-time'>Cook Time: </p>
                        <input className='time-input' type='text' name='cook-time' value={recipe.time} onChange={e => edit(e.target.value, 'time')}/>
                    </div>
                    <div className='detail-input'>
                        <p htmlFor='servings'>Servings: </p>
                        <input className='serving-input' type='number' name='servings' value={recipe.servings} max={99} onChange={handleServingChange}/>
                    </div>
                    <div className='tags'>
                        <p>Tags:</p>
                        <input 
                        className='tag-input' 
                        placeholder='Add Tag' 
                        value={tagValue}
                        onChange={e => setTagValue(e.target.value.toLowerCase())}
                        onKeyDown={handleTagInput} />
                        {recipe.tags.map((t, id) => <button className='tag removable-tag' key={id} onClick={handleRemoveTag} value={t}>{t}</button>)}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default RecipeTile