import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const loadRecipes = createAsyncThunk(
    'recipes/loadRecipes',
    async () => {
        const resp = await fetch('http://localhost:5000/recipes/');
        const json = await resp.json();
        return json.data;
    }
)


const recipesSlice = createSlice({
    name: 'home',
    initialState: {
        recipes: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [loadRecipes.pending]: (state, action) => {
            state.isLoading = true;
        },
        [loadRecipes.fulfilled]: (state, action) => {
            state.recipes = action.payload;
            state.isLoading = false;
        },
        [loadRecipes.rejected]: (state, action) => {
            state.isLoading = false;
        },
    }

});

export const selectRecipes = (state) => state.recipes.recipes;
export const {addRecipe, updateRecipe, deleteRecipe} = recipesSlice.actions;
export default recipesSlice.reducer;