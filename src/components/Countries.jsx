import React, { useEffect } from 'react'
import { fetchAllCountries } from '../features/country/countrySlice';
import { useDispatch, useSelector } from 'react-redux';
import { CountryCard } from './CountryCard';
import { CountryNameSearchInput } from './CountryNameSearchInput';
import RegionFilterDropdown from './RegionFilterDropdown';


const Countries = React.memo(() => {

    const countriesState = useSelector((state) => state.allCountries);
    const dispatch = useDispatch();

    const handleOnClick = ({ key }) => {
        console.log(`This is the key ${key}`);
    }

    useEffect(() => {
        console.log('This is a nice must-have feature!');
        if (!countriesState.displayedCountries.length) {
            dispatch(fetchAllCountries());
        } else {
            console.log('We are not refecthing the data');
        }
    }, []);
    return (
        <>
            <div>
                <CountryNameSearchInput />
                <RegionFilterDropdown />
            </div>
            <div className="countries_container">
                {
                    countriesState.loading ?
                        <p>Loading... Please wait...</p>
                        :
                        (
                            (countriesState.errorMsg.length && countriesState.displayedCountries.length)
                                ? <p className="data_loading_error">Sorry. There was an error. Please refresh the browser and try again.</p>
                                :
                                countriesState.displayedCountries.map((country) => <CountryCard key={country.cca3} info={country} />)
                        )
                }
            </div>
        </>
    )
});

export default Countries;