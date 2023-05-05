import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../util/apiConfig";

export const addInProgress = createAsyncThunk(
    'inProgress/addInProgress',
    async ({recipe}) => {
        const resp = await fetch(`${baseUrl}/inProgress/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization' : `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(recipe),
        }).then(response => response.json());
        return resp.data;
    }
)
export const loadInProgress = createAsyncThunk(
    'inProgress/loadInProgress',
    async () => {
        const resp = await fetch(`${baseUrl}/inProgress/`, {
            headers: { 'authorization' : `Bearer ${localStorage.getItem('token')}`}
        });
        const json = await resp.json();
        return json.data;
    }
)
export const saveInProgress = createAsyncThunk(
    'inProgress/saveInProgress',
    async ({recipeId, recipe}) => {
        const resp = await fetch(`${baseUrl}/inProgress/${recipeId}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'authorization' : `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(recipe),
        });
        const json = await resp.json();
        return json.data;
    }
)
export const removeInProgress = createAsyncThunk(
    'inProgress/removeInProgress',
    async ({recipeId}) => {
        const resp = await fetch(`${baseUrl}/inProgress/${recipeId}`, {
            method: 'DELETE',
            headers: {'authorization' : `Bearer ${localStorage.getItem('token')}`}
        }).then(response => response.json());
        return resp;
    }
)

const inProgressSlice = createSlice({
    name: 'inProgress',
    initialState: {
        inProgress: [],
        isLoading: false,
        requestFailed: false,
    },
    reducers: {},
    extraReducers: {
        [addInProgress.pending]: (state, action) => {
            state.isLoading = true;
            state.requestFailed = false;
        },
        [addInProgress.fulfilled]: (state, action) => {
            state.inProgress = [action.payload, ...state.inProgress];
            state.isLoading = false;
            state.requestFailed = false;
        },
        [addInProgress.rejected]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = true;
        },

        [loadInProgress.pending]: (state, action) => {
            state.isLoading = true;
            state.requestFailed = false;
        },
        [loadInProgress.fulfilled]: (state, action) => {
            state.inProgress = action.payload;
            state.isLoading = false;
            state.requestFailed = false;
        },
        [loadInProgress.rejected]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = true;
        },

        [saveInProgress.pending]: (state, action) => {
            state.isLoading = true;
            state.requestFailed = false;
        },
        [saveInProgress.fulfilled]: (state, action) => {
            const indexToFind = state.inProgress.findIndex(r => r._id === action.payload._id);
            state.inProgress[indexToFind] = action.payload;
            state.isLoading = false;
            state.requestFailed = false;
        },
        [saveInProgress.rejected]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = true;
        },

        [removeInProgress.pending]: (state, action) => {
            state.isLoading = true;
            state.requestFailed = false;
        },
        [removeInProgress.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = false;
        },
        [removeInProgress.rejected]: (state, action) => {
            state.isLoading = false;
            state.requestFailed = true;
        },
    }
});

export const selectInProgress = (state) => state.inProgress.inProgress;
export const selectIsLoading = state => state.inProgress.isLoading;
export const selectRequestFailed = state => state.inProgress.requestFailed;
export default inProgressSlice.reducer;