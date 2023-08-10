import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from "../../utils/api";
import axios from 'axios';

import { setSelectedRegion, clearSelectedRegion } from '../regionFilter/regionFilterSlice';

// define the initial state (or skeleton) of this part of the application
const initialState = {
    allCountries: [],
    loading: false,
    errorMsg: "",
    selectedDisplayCountry: {},
    displayedCountries: [],
};

export const fetchAllCountries = createAsyncThunk(
    'country/fetchAllCountries',
    async () => {
        return axios.get(API.all).then((response) => response.data)
    }
)

export const fetchCountryByAlphaCode = createAsyncThunk(
    'country/fetchCountryByAlphaCode',
    async (code) => {
        return axios.get(`${API.alphaSearch}/${code}`).then((response) => response.data);
    }
)

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountries: (state, action) => {
            state.loading = false;
            state.displayedCountries = action.payload;
            state.errorMsg = "";
        },

        setSelectedDisplayCountry: (state, action) => {
            state.loading = false;
            state.selectedDisplayCountry = action.payload;
            state.errorMsg = "";
        },

        clearSelectedDisplayCountry: (state) => {
            state.loading = false;
            state.selectedDisplayCountry = {};
            state.errorMsg = "";
        },

        clearNameFilter: (state) => {
            state.loading = false;
            state.selectedDisplayCountry = {};
            state.errorMsg = '';
            state.displayedCountries = state.allCountries;
        },

        filterCountriesByName: (state, action) => {
            state.loading = false;
            state.selectedDisplayCountry = {};
            state.errorMsg = '';
            const q = action.payload.toLowerCase().trimStart();
            // if there is no search term, we simply dispatch the clear name filter
            if(!q) {
                state.displayedCountries = state.allCountries;
                return;   
            }
            // if(!state.displayedCountries) {
            //     console.log(state);
            // }
            console.log(`Thank goodness we are here! with ${action.payload}`);
            console.log(state.displayedCountries.length);
            const displayedCountries = state.displayedCountries.filter((country) => {
                const common_name = country.name.common.toLowerCase();
                const official_name = country.name.official.toLowerCase();
                return common_name.includes(q) || official_name.includes(q);
            })

            state.displayedCountries = displayedCountries.length ? displayedCountries : []; 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCountries.pending, (state) => {
            state.loading = true;
            state.allCountries = [];
            state.displayedCountries = [];
            state.errorMsg = ""
        })
        builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.allCountries = action.payload;
            state.displayedCountries = state.allCountries;
            state.errorMsg = "";
        })
        builder.addCase(fetchAllCountries.rejected, (state, action) => {
            state.loading = false;
            state.allCountries = [];
            state.displayedCountries = state.allCountries;
            state.errorMsg = action.error.message;
        })


        // SECTION: Fetching Country info by the alpha code 
        // builder.addCase(fetchCountryByAlphaCode.pending, (state) => {
        //     state.loading = true;
        //     state.errorMsg = "";
        //     state.selectedDisplayCountry = {};
        // })
        // builder.addCase(fetchCountryByAlphaCode.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.errorMsg = "";
        //     state.selectedDisplayCountry = action.payload[0];
        // })
        // builder.addCase(fetchCountryByAlphaCode.rejected, (state, action) => {
        //     state.loading = false;
        //     state.errorMsg = action.error.message;
        //     state.selectedDisplayCountry = {};
        // })




        // Search for a list of countries belonging to the specified region
        builder.addCase(setSelectedRegion, (state, action) => {
            const region = action.payload.toLowerCase();
            if(region) {
                state.displayedCountries = state.allCountries.filter((country, index) => {
                    return country.region.toLowerCase() === region;
                });
            } else {
                state.displayedCountries = state.allCountries;
            }
            console.log(`Filtering done for the selected region.`);
        })

        // Changing the selected retion to re-display all the countries
        builder.addCase(clearSelectedRegion, (state) => {
            state.loading = false;
            state.displayedCountries = state.allCountries;
            state.selectedDisplayCountry = {};
            state.error = "";
            console.log(`Filter on countries cleared.`);
        })


        // Search for a country using the name

        // builder.addCase(searchCountriesByName.pending, (state, action) => {
        //     state.loading = true;
        //     state.displayedCountries = action.payload;
        //     state.errorMsg = "";
        // })
        // builder.addCase(searchCountriesByName.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.displayedCountries = action.payload;
        //     state.errorMsg = "";
        // })
        // builder.addCase(searchCountriesByName.rejected, (state, action) => {
        //     state.loading = false;
        //     state.displayedCountries = [];
        //     state.errorMsg = action.error.message;
        // })


        // builder.addCase(filterCountriesByRegion.pending, (state) => {
        //     state.loading = true;
        //     state.displayedCountries = [];
        //     state.errorMsg = "";
        // })
        // builder.addCase(filterCountriesByRegion.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.displayedCountries = action.payload;
        //     state.errorMsg = "";
        // })
        // builder.addCase(filterCountriesByRegion.rejected, (state, action) => {
        //     state.loading = false;
        //     state.displayedCountries = [];
        //     state.errorMsg = action.error.message;
        // })

    }
})

export default countrySlice.reducer;

export const { setCountries, setSelectedDisplayCountry, clearSelectedDisplayCountry, clearNameFilter, filterCountriesByName } = countrySlice.actions;

