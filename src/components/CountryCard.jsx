import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const CountryCard = ({ info }) => {

  const navigate = useNavigate();  
  const darkModeState = useSelector((state) => state.darkMode);

  return (
    <>
      <div className='country_card' onClick={() => { navigate(`/${info.cca3}/`) }}>
          <div className="country_flag_container">
            <img className='country_flag' src={info.flags.svg} alt={info.flags.alt} />
          </div>
          <div className='info'>
            <p className='country_name'>{info.name.common}</p>
            <div className='country_stat_basic'>
              <p><span className='population'>Population: </span>{info.population}</p>
              <p><span className='region'>Region: </span>{info.region}</p>
              <p><span className='capital'>Capital: </span>{info.capital}</p>
            </div>
          </div>
          {/* <p>We are using the {darkModeState.modeName} mode.</p> */}
        {/* <Link to={`/${info.cca3}`}>

        </Link> */}
      </div>

    </>
  )
}
