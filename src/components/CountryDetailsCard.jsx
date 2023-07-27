import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryByAlphaCode, setSelectedDisplayCountry, clearSelectedDisplayCountry } from '../features/country/countrySlice';

const CountryDetailsCard = () => {

    const { cca3 } = useParams();
    const navigate = useNavigate();

    const countriesState = useSelector((state) => state.allCountries);
    const darkModeState = useSelector((state) => state.darkMode);

    const allCountries = countriesState.allCountries;
    const selectedDisplayCountry = countriesState.selectedDisplayCountry;

    const dispatch = useDispatch();

    const handleBorderCountryClick = (e) => {
        e.preventDefault();
        setCountryCode(e.target.innerText.trim());
        console.log('the thing is supposed to change');
        navigate(`/${e.target.innerText}`);
    }

    const [countryCode, setCountryCode] = useState(cca3);

    useEffect(() => {
        console.log(`All for ${cca3}`);
        if(allCountries.length) {
            console.log(`There were countries before oo`);
            const info = allCountries.filter((country) => country.cca3 === cca3);
            console.log(info[0]);
            dispatch(setSelectedDisplayCountry(info[0]));
        } else {
            console.log(`WTF!.... we are crusing around by starting from this route!`);
            dispatch(fetchCountryByAlphaCode(cca3));
        }
    }, [countryCode]);

    return (
        <>
            <div className='details_page'>
                <div className="back_button">
                    <button type="button" style={{ border: '1px solid #eee', color: '#999', padding: '30px' }} onClick={() => navigate('/')}>Back</button>
                </div>

                <div className="country_card_details">
                    {
                        countriesState.loading ? <p>Loading...</p> : 
                        countriesState.errorMsg ? <p>There was an error: {countriesState.errorMsg}</p> :
                        <>
                            <div>
                                <p>The country with the country code {cca3} will be available here.</p>
                            </div>
                            <div className="border_countries">
                                <ul>Borders: {selectedDisplayCountry && selectedDisplayCountry.borders ? selectedDisplayCountry.borders.map((border) => (<li onClick={handleBorderCountryClick} key={border}>{border}</li>)) : (<div>No borders</div>)}</ul>

                            </div>
                        </>
                    }    
                </div>
            
                <p>N.B: We are currently using the {darkModeState.modeName} mode!</p>
            </div>
        </>
    )
}

export default CountryDetailsCard