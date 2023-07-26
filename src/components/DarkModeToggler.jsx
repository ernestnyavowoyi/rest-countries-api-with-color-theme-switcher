import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../features/darkMode/darkModeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DarkModeToggler = () => {

    const dispatch = useDispatch();

    const handleNightModeToggle = () => {
        dispatch(toggleDarkMode()); 
    }

  return (
    <>
        <div onClick={handleNightModeToggle}>
            <div className="dark_mode_toggler">
              <p><FontAwesomeIcon icon="home" /></p>
              <p>Dark Mode</p>
            </div>
        </div>
    </>
  )
}

export default DarkModeToggler