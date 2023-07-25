import React from 'react'

export const CountryCard = ({ info }) => {
  return (
    <div>
        <p>Name: {info.name.official}</p>
    </div>
  )
}
