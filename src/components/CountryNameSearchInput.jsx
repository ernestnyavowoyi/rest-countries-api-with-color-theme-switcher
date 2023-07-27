import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchCountriesByName, updateSearchTerm } from '../features/nameSearch/nameSearchSlice';
import { setCountries } from '../features/country/countrySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export const CountryNameSearchInput = () => {
    const countryNameSearchState = useSelector((state) => state.nameSearch);
    const allCountries = useSelector((state) => state.allCountries);
    const dispatch = useDispatch();

    return (
        <>
            <div className="country_name_search_input">
                <label htmlFor="countrySearchInput"><FontAwesomeIcon icon={faSearch} /></label>
                <input placeholder='Search for a country...' type="text" id="countrySearchInput" onChange={(e) => dispatch(updateSearchTerm(e.target.value.trimStart()))} value={countryNameSearchState.searchTerm} onKeyUp={(key) => { 
                    if(key.code === 'Enter') {
                        if(countryNameSearchState.searchTerm.trimStart() === '') {
                            dispatch(setCountries(allCountries.allCountries));  
                        } else {
                            dispatch(searchCountriesByName(countryNameSearchState.searchTerm.trimStart()))
                        }
                    }
                }                     
                }/>
            </div>
        </>
    )
}
