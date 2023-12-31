import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api";
import axios from "axios";
import { setSelectedRegion, clearSelectedRegion } from '../../features/regionFilter/regionFilterSlice';

const initialState = {
    searchTerm: "",
    searchResults: [],
    loading: false,
    errorMsg: ""
};

export const searchCountriesByName = createAsyncThunk(
    'search',
    async (name) => {
        console.log('this is fine oo' + name);
        return axios.get(`${API.nameSearch}/${name}`).then((response) => response.data);
    }
);


const nameSearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchTerm: (state, action) => {
            if (action.payload.trimStart() === "") {
                state.searchTerm = "";
            } else {
                state.searchTerm = action.payload;
            }
        },
        clearSearchTerm: (state) => {
            state.searchTerm = "";
        },
    },
    extraReducers: (builder) => {

        // When a region is changed, clear the name
        builder.addCase(setSelectedRegion, (state, action) => {
            // state.searchTerm = "";
            state.loading = false;
            state.errorMsg = "";
            console.log('Country search term has been cleared.');
        })

        builder.addCase(clearSelectedRegion, (state) => {
            state.loading = false;
            state.errorMsg = '';
            state.searchTerm = "";
            console.log(`The country name has been cleared!`);
        })

        // These extraReducers are no longer needed as we don't need to perform additional network or async request

        // builder.addCase(searchCountriesByName.pending, (state) => {
        //     state.searchResults = [];
        //     state.loading = true;
        //     state.errorMsg = "";
        // })

        // builder.addCase(searchCountriesByName.fulfilled, (state, action) => {
        //     state.searchResults = action.payload;
        //     state.loading = false;
        //     state.errorMsg = "";
        // })

        // builder.addCase(searchCountriesByName.rejected, (state, action) => {
        //     state.loading = false;
        //     state.errorMsg = action.error.message;
        // })

    }
});

export default nameSearchSlice.reducer;

export const { updateSearchTerm, clearSearchTerm } = nameSearchSlice.actions;

