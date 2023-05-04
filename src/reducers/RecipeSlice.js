import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../util/apiConfig';

export const addRecipe = createAsyncThunk(
    'recipes/addRecipe',
    async ({recipe}) => {
        const resp = await fetch(`${baseUrl}/recipes/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization' : `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(recipe),
        }).then(response => response.json());
        return resp.data;
    }
)

export const loadRecipes = createAsyncThunk(
    'recipes/loadRecipes',
    async () => {
        console.log('trynna load');
        const resp = await fetch(`${baseUrl}/recipes/`, {
            headers: {'authorization' : `Bearer ${localStorage.getItem('token')}`}
        });
        const json = await resp.json();
        return json.data;
    }
)

export const saveRecipe = createAsyncThunk(
    'recipes/saveRecipe',
    async ({recipeId, recipe}) => {
        const resp = await fetch(`${baseUrl}/recipes/${recipeId}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'authorization' : `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(recipe),
        });
        const json = await resp.json();
        return json.data;
    }
)

export const removeRecipe = createAsyncThunk(
    'recipes/removeRecipe',
    async ({recipeId}) => {
        const resp = await fetch(`${baseUrl}/recipes/${recipeId}`, {
            method: 'DELETE',
            headers: {'authorization' : `Bearer ${localStorage.getItem('token')}`}
        }).then(response => response.json());
        return resp;
    }
)


const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        isLoading: false,
        requestFailed: false,
    },
    reducers: {},
    extraReducers: {
        [addRecipe.pending]: (state, action) => {
            state.isLoading = true;
            state.requestFailed = false;
        },
        [addRecipe.fulfilled]: (state, action) => {
            state.recipes = [...state.recipes, action.payload];
            state.isLoading = false;
            state.requestFailed = false;
        },
        [addRecipe.rejected]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = true;
        },

        [loadRecipes.pending]: (state, action) => {
            state.isLoading = true;
            state.requestFailed = false;
        },
        [loadRecipes.fulfilled]: (state, action) => {
            state.recipes = action.payload;
            state.isLoading = false;
            state.requestFailed = false;
        },
        [loadRecipes.rejected]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = true;
        },
        [saveRecipe.pending]: (state, action) => {
            state.isLoading = true;
            state.requestFailed = false;
        },
        [saveRecipe.fulfilled]: (state, action) => {
            console.log(action.payload);
            const indexToFind = state.recipes.findIndex(r => r._id === action.payload._id);
            state.recipes[indexToFind] = action.payload;
            state.isLoading = false;
            state.requestFailed = false;
        },
        [saveRecipe.rejected]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = true;
        },
        [removeRecipe.pending]: (state, action) => {
            state.isLoading = true;
            state.requestFailed = false;
        },
        [removeRecipe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = false;
        },
        [removeRecipe.rejected]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = true;
        },
    }

});

export const selectRecipes = (state) => state.recipes.recipes;
export const selectIsLoading = state => state.recipes.isLoading;
export const selectRequestFailed = state => state.recipes.requestFailed;
export default recipesSlice.reducer;