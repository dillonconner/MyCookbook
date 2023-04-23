import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import './EditInProgress.css';

import RecipeTile from "../../components/recipeTile/RecipeTile";
import RecipeInstructions from "../../components/recipeInstructions/RecipeInstructions";

import { saveInProgress, removeInProgress, loadInProgress } from "../../reducers/InProgressSlice";
import { addRecipe } from "../../reducers/RecipeSlice";

const EditInProgress = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const [ isEdit, setIsEdit ] = useState(false);
    
    const currInProgress = useSelector(state => state.inProgress.inProgress.find(r => r._id === recipeId));
    const [recipe, setRecipe] = useState(currInProgress ? currInProgress : 
                                                            {versions:[ {ingredients: [], steps: []} ]});

    if(!currInProgress)  dispatch(loadInProgress());
    useEffect(() => {
        setRecipe(currInProgress);
    }, [currInProgress])

    const edit = (value, prop) => {
        const newInProgress = { ...recipe };
        if(prop === 'ingredients'){
            const newVersions = [...recipe.versions.slice(0,-1), {
                ingredients: value,
                steps: recipe.versions.at(-1).steps }];
            newInProgress['versions'] = newVersions;
        }
        else if(prop === 'steps'){
            const newVersions = [...recipe.versions.slice(0,-1), {
                ingredients: recipe.versions.at(-1).ingredients,
                steps: value }];
            newInProgress['versions'] = newVersions;
        }
        else newInProgress[prop] = value;
        
        setRecipe(newInProgress);
    }

    const handleEditBtn = (e) => setIsEdit(true)
    const handleSaveBtn = (e) => {
        dispatch(saveInProgress({recipeId:recipeId, recipe:recipe}))
        setIsEdit(false);
    }
    const handleCancelBtn = (e) => {
        setRecipe(currInProgress);
        setIsEdit(false);
    }
    const handleNewVersionBtn = (e) => {
        const newInProgress = {...recipe};
        newInProgress.versions = [...recipe.versions, recipe.versions.at(-1)];
        setRecipe(newInProgress);
        setIsEdit(true);
    }
    const handleFinalizeBtn = (e) => {
        const finalRecipe = {
            ...recipe,
            ingredients: recipe.versions.at(-1).ingredients,
            steps: recipe.versions.at(-1).steps
        };
        delete finalRecipe.versions;
        dispatch(addRecipe({recipe:finalRecipe}));
        dispatch(removeInProgress({recipeId:recipeId}));
        navigate(-1);
    }
    const handleDeleteBtn = (e) => {
        // are you sure message
        dispatch(removeInProgress({recipeId:recipeId}));
        navigate('/');
    }
    const handleRevertBtn = (e) => {
        const index = parseInt(e.target.getAttribute('version-key'));
        const newVersions = [...recipe.versions.slice(0,index+1)];
        edit(newVersions, 'versions');
    }
    
    if(!recipe) return <div>Loading</div>
    
    return (
        <div className="edit-inprogress">
            <RecipeTile isEdit={isEdit} recipe={recipe} edit={edit} />
            
                {!isEdit ? 
                <div className="options">
                    <button onClick={handleEditBtn}>Edit</button>
                    <button onClick={handleFinalizeBtn}>Finalize</button>
                    <button onClick={handleDeleteBtn}>Delete</button> 
                </div>
                :
                <div className="options">
                    <button onClick={handleSaveBtn}>Save</button>
                    <button onClick={handleCancelBtn}>Cancel</button>
                </div>
                }
                
            
            
            <div className="versions">
                    {recipe.versions.map((v,id) => {
                        return (
                            <div className="version" key={id}>
                                <h3>Version {id+1}</h3>
                                
                                <RecipeInstructions 
                                    isEdit={isEdit && (id+1 === recipe.versions.length)} 
                                    ingredients={v.ingredients}
                                    steps={v.steps}  
                                    edit={edit} />
                                {id+1 < recipe.versions.length &&<button className="revert" version-key={id} onClick={handleRevertBtn}>Revert</button>}
                            </div>
                        )
                       
                    })}
                    <button onClick={handleNewVersionBtn}>+</button>
            </div>
        </div>
    )
}
export default EditInProgress