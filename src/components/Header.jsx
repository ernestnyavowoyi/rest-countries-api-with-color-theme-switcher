import React from 'react'
import DarkModeToggler from './DarkModeToggler';
const Header = () => {
  return (
    <div className="header_container">
      <div className="header">
        <p className="app_title">Where in the world?</p>
        <div><DarkModeToggler /></div>
      </div>
    </div>
  )
}


export default Header;