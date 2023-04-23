import React, { useEffect } from "react";
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes, loadRecipes } from '../../reducers/RecipeSlice';
import { selectInProgress, loadInProgress } from "../../reducers/InProgressSlice";

import InProgressTile from "../../components/inProgress/InProgressTile";
import RecipePreview from "../../components/recipePreview/RecipePreview";
import UserCard from "../../components/profile/UserCard";

const Home = () => {
    const dispatch = useDispatch();
    const inProgress = useSelector(selectInProgress);
    const recipes = useSelector(selectRecipes);

    useEffect(() => {
        dispatch(loadRecipes());
        dispatch(loadInProgress());
    }, []);

    return (
        <div className="home">
            <div className="temp">
                <UserCard />
                <div>
                    <h2>In Progress</h2>
                    {inProgress.length > 0 ? 
                        inProgress.map((r, id) => <InProgressTile key={id} recipe={r}/>)
                    :
                        <h2>No In Progress Recipes</h2>
                    }
                </div>
            </div>
            <h2>Recipes</h2>
            <div className="preview-area">
                {recipes.map((r, id) => <RecipePreview key={id} recipe={r}/>)}
            </div>
            
        </div>
    )
}
export default Home