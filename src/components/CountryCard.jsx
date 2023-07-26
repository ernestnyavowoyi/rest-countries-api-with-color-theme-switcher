import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const CountryCard = ({ info }) => {

  const navigate = useNavigate();

  return (
    <>
      <Link to={`/${info.cca3}`}>
        <div onClick={() => { /* navigate(`/${info.cca3}/`)*/ }} style={{ color: 'blue', padding: '20px', border: '2px solid #ddd' }}>
          <p>Name: {info.name.official}</p>
        </div>
      </Link>

    </>
  )
}
