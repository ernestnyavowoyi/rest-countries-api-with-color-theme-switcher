import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from "../../utils/api";
import axios from 'axios';
// define the initial state (or skeleton) of this part of the application
const initialState = {
    allCountries: [],
    selectedCountry: {},
    loading: false,
    errorMsg: ""
};

export const fetchAllCountries = createAsyncThunk(
    'country/fetchAllCountries',
    async () => {
        return axios.get(API.all).then((response) => response.data)
    }
)

const countrySlice = createSlice({
    name: 'country',
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllCountries.pending, (state) => {
            state.loading = true;
            state.allCountries = [];
            state.errorMsg = ""
        })
        builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.allCountries = action.payload;
            state.errorMsg = "";
        })
        builder.addCase(fetchAllCountries.rejected, (state, action) => {
            state.loading = false;
            state.allCountries = [];
            state.errorMsg = action.error.message;
        })
    }
})

export default countrySlice.reducer;

