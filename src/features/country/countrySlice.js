import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from "../../utils/api";
// define the initial state (or skeleton) of this part of the application
const initialState = {
    allCountries: [],
    selectedCountry: {},
    loading: false,
    errorMsg: ""
};

const fetchAllCountries = createAsyncThunk(
    'country/fetchAllCountries',
    async () => {
        return 
    }
)

const countrySlice = createSlice({
    name: 'country',
    initialState, 
    reducers: {},
    extraReducers: (builder) => {

    }
})

