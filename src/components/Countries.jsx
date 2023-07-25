import React, { useEffect } from 'react'
import { fetchAllCountries } from '../features/country/countrySlice';
import { useDispatch, useSelector } from 'react-redux';
import { CountryCard } from './CountryCard';

const Countries = () => {

    const countriesState = useSelector((state) => state.allCountries);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('This is a nice must-have feature!');
        dispatch(fetchAllCountries());
    }, []);
  return (
    <>
        <div className="countries_container">
            <p>There are {countriesState.allCountries.length} countries available!</p>
            The list of countries will be displayed here...
            <div>
                {countriesState.allCountries.map((country) => <CountryCard info={country} />)}
            </div>
        </div>
    </>
  )
}

export default Countries;