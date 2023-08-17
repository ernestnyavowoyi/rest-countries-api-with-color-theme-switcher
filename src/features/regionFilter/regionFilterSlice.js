import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";

const initialState = {
    selectedRegion: "",
    loading: false,
    results: [],
    errorMsg: ""
};

export const filterCountriesByRegion = createAsyncThunk(
    'filterCountriesByRegion',
    async (region) => {
        return axios.get(`${API.regionSearch}/${region}`).then((response) => response.data);
    }
)

const regionFilterSlice = createSlice({
    name: 'regionFilter',
    initialState,
    reducers: {
        setSelectedRegion: (state, action) => {
            console.log(action.payload);

            const region = action.payload.trim();
            if(region) {
                state.selectedRegion = region;
            } else {
                state.selectedRegion = "";
            }
        },
        clearSelectedRegion: (state) => {
            state.selectedRegion = "";
        },
    },
    extraReducers: (builder) => {

        // These extra reducers are no longer needed as we don't need to perform another network request to filter the countries by their region.

        /*
        builder.addCase(filterCountriesByRegion.pending, (state) => {
            state.results = [];
            state.loading = true;
            state.errorMsg = "";
        })
        builder.addCase(filterCountriesByRegion.fulfilled, (state, action) => {
            state.results = action.payload;
            state.loading = false;
            state.errorMsg = "";
        })
        builder.addCase(filterCountriesByRegion.rejected, (state, action) => {
            state.results = [];
            state.loading = false;
            state.errorMsg = action.error.message;
        })
        */

    }
})

export default regionFilterSlice.reducer;

export const { setSelectedRegion, clearSelectedRegion} = regionFilterSlice.actions;