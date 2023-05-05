import React, { useEffect, useState } from "react";
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectRecipes, loadRecipes } from '../../reducers/RecipeSlice';
import { selectInProgress, loadInProgress, addInProgress } from "../../reducers/InProgressSlice";

import InProgressTile from "../../components/inProgressTile/InProgressTile";
import RecipePreview from "../../components/recipePreview/RecipePreview";
import useDebounce from '../../hooks/useDebounce';
import loadingIcon from '../../util/Loading_icon.gif';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inProgress = useSelector(selectInProgress);
    const recipes = useSelector(selectRecipes);
    
    
    const [searchTerm, setSearchTerm] = useState('');
    const [ searchLoading, setSearchLoading ] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [searchedRecipes, setSearchedRecipes] = useState(recipes);

    useEffect(() => {
        dispatch(loadInProgress());
        dispatch(loadRecipes());
    }, [dispatch]);

    useEffect(() => {
        setSearchedRecipes(recipes.filter((r) => r.name.toLowerCase().includes(debouncedSearch) || r.tags.includes(debouncedSearch)));
        setSearchLoading(false);
    }, [recipes, debouncedSearch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setSearchLoading(true);
    };

    const handleNewRecipeBtn = () => {
        const newInProgress = {
            name: 'New Recipe',
            description: 'Enter Recipe Description',
            imgURL: '',
            time: '',
            tags: [],
            servings: 1,
            versions: [{
                ingredients: [''], 
                steps: ['']
            }]};
        dispatch(addInProgress({recipe: newInProgress}));
    }

    return (
        <div className="home">
            <div className="preview-heading">
                <h2>In Progress</h2>
                <button className="new-recipe" onClick={handleNewRecipeBtn}>New Recipe</button>
            </div>
            <div className="preview-area">
                {inProgress.length > 0 ? 
                    inProgress.map((r, id) => <InProgressTile key={id} recipe={r}/>)
                    :
                    <h2>No In Progress Recipes</h2>
                }
            </div>
            <div className="preview-heading recipes">
                <h2>Finished Recipes</h2>
                {searchLoading && <img className="loading-img" src={loadingIcon} alt={null} />}
                <input className="search-bar" 
                type="text" 
                placeholder="Search for recipe (name or tag)" 
                value={searchTerm}
                onChange={handleSearchChange} />
            </div>
            
            <div className="preview-area">
                {searchedRecipes.length > 0 ?
                    searchedRecipes.map((r, id) => <RecipePreview key={id} recipe={r}/>)
                    :
                    <h2>No Finished Recipes Found</h2>}
            </div>
        </div>
    )
}
export default Home