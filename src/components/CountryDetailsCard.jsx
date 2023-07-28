import React, { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryByAlphaCode, setSelectedDisplayCountry } from '../features/country/countrySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';


const CountryDetailsCard = () => {

    const { cca3 } = useParams();
    const location = useLocation();

    const navigate = useNavigate();

    const countriesState = useSelector((state) => state.allCountries);

    const allCountries = countriesState.allCountries;
    const selectedDisplayCountry = countriesState.selectedDisplayCountry;

    const dispatch = useDispatch();

    const getNativeName = (obj) => {
        if(!obj) {
            return "";
        };
        const keys = Object.keys(obj);
        const lastKey = keys[keys.length - 1];
        return obj[lastKey].common;
    }

    const getTopLevelDomains = (arr) => {
        if(!arr || !arr.length) {
            return "";
        };
        return arr.join(", ");
    }

    const getCurrencies = (obj) => {
        if(!obj) {
            return "";
        };
        const keys = Object.keys(obj);
        const result = keys.map((curr) => obj[curr].name);
        return result.join(", ");
    }

    const handleBorderCountryClick = (e) => {
        e.preventDefault();
        // setCountryCode(e.target.innerText.trim());
        console.log('the thing is supposed to change');
        navigate(`/${e.target.innerText}`);
    }

    useEffect(() => {
        if (allCountries.length) {
            console.log(`There were countries before oo`);
            const info = allCountries.filter((country) => country.cca3 === cca3);
            console.log(info[0]);
            dispatch(setSelectedDisplayCountry(info[0]));
        } else {
            console.log(`WTF!.... we are crusing around by starting from this route!`);
            dispatch(fetchCountryByAlphaCode(cca3));
        }
    }, [location.pathname]);

    return (
        <div className="details_page_container">
            
            <div className='details_page'>
                <div className="back_button_container">
                    <button className='button' type="button" onClick={() => navigate('/')}><span><FontAwesomeIcon icon={faArrowLeftLong} /></span> <span>Back</span></button>
                </div>

                {countriesState.loading ? <p>Loading...</p> :

                    countriesState.errorMsg.length ? <p>Error: {countriesState.errorMsg}</p> :

                        Object.keys(countriesState.selectedDisplayCountry).length ?
                            <div className="country_card_details">
                                {
                                    <>
                                        <div className='flag'>
                                            <img src={selectedDisplayCountry && selectedDisplayCountry.flags.svg} alt="" />
                                        </div>
                                        <div className="country_info_container">
                                            <div className='selected_country_name'>
                                                <p>{selectedDisplayCountry.name.common}</p>
                                            </div>
                                            <div className='country_info'>
                                                <div className='country_info_1'>
                                                    <p>Native Name: <span>{getNativeName(selectedDisplayCountry.name.nativeName)}</span></p>
                                                    <p>Population: <span>{selectedDisplayCountry.population}</span></p>
                                                    <p>Region: <span>{selectedDisplayCountry.region}</span></p>
                                                    <p>Sub Region: <span>{selectedDisplayCountry.subregion}</span></p>
                                                    <p>Capital: <span>{selectedDisplayCountry.capital}</span></p>
                                                </div>
                                                <div className='country_info_2'>
                                                    <p>Top Level Domain: <span>{getTopLevelDomains(selectedDisplayCountry.tld)}</span></p>
                                                    <p>Currencies: <span>{getCurrencies(selectedDisplayCountry.currencies)}</span></p>
                                                    <p>Languages: <span>{selectedDisplayCountry.region}</span></p>
                                                </div>
                                            </div>
                                            <div className="border_countries_container">
                                                <p className="border_countries_header">Border Countries:</p>
                                                <ul className='border_countries'>{selectedDisplayCountry.borders ? selectedDisplayCountry.borders.map((border) => (<li className='button' onClick={handleBorderCountryClick} key={border}>{border}</li>)) : (<span>No border countries.</span>)}</ul>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            :
                            <div className='country_card_details_not_found'>
                                <p>Sorry. The requested country was not found.</p>
                            </div>
                }

            </div>
        </div>
    )
}

export default CountryDetailsCard