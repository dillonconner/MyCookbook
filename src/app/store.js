import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../reducers/RecipeSlice';
import inProgressReducer from '../reducers/InProgressSlice';

export default configureStore({
    reducer: {
        recipes: recipeReducer,
        inProgress: inProgressReducer,
    }
})