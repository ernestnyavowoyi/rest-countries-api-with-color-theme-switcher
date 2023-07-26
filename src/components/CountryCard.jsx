import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const CountryCard = ({ info }) => {

  // const navigate = useNavigate();

  
  const darkModeState = useSelector((state) => state.darkMode);

  return (
    <>
      <Link to={`/${info.cca3}`}>
        <div onClick={() => { /* navigate(`/${info.cca3}/`)*/ }} style={{ color: 'blue', padding: '20px', border: '2px solid #ddd' }}>
          <p>Name: {info.name.common}</p>
        </div>
        <p>We are using the {darkModeState.modeName} mode.</p>
      </Link>

    </>
  )
}
