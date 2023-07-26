import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const CountryDetailsCard = () => {

    const { cca3 } = useParams();
    const navigate = useNavigate();
    const countries = useSelector((state) => state.allCountries.allCountries);

    const [countryInfo, setCountryInfo] = useState([]);


    useEffect(() => {
        console.log(`The cca3 is now ${cca3}`)
        const info = countries.filter((country) => country.cca3 === cca3)['0'];
        setCountryInfo(info);

    }, []);

    return (
        <>
            <div className="back_button">
                <button type="button" style={{ border: '1px solid #eee', color: '#999', padding: '30px' }} onClick={() => navigate('/')}>Back</button>
            </div>

            <div>
                <p>The country with the country code {cca3} will be available here.</p>
                <p>The full details of the country you clicked on will be available here.</p>
                <p>Thanks to the useful extraction of the search params!</p>
            </div>
            <div className="border_countries">
                <p>{cca3}</p>
                <ul>Borders: {countryInfo && countryInfo.borders ? countryInfo.borders.map((border) => (<li key={border}>{border}</li>)) : (<div>No borders</div>)}</ul>

            </div>
        </>
    )
}

export default CountryDetailsCard