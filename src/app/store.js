import { configureStore } from "@reduxjs/toolkit";
import countryReducer from '../features/country/countrySlice';
import nameSearchReducer from '../features/nameSearch/nameSearchSlice';
import regionFilterReducer from "../features/regionFilter/regionFilterSlice";

const store = configureStore({
    reducer: {
        allCountries: countryReducer,
        nameSearch: nameSearchReducer, 
        regionFilter: regionFilterReducer
    }
});

export default store;