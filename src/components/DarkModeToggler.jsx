import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../features/darkMode/darkModeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'


const DarkModeToggler = () => {

    const dispatch = useDispatch();

    const handleNightModeToggle = () => {
        dispatch(toggleDarkMode()); 
    }

  return (
    <>
        <div onClick={handleNightModeToggle} className='dark_mode_toggler'>
              <div><FontAwesomeIcon icon={faMoon}/></div>
              <div>Dark Mode</div>
        </div>
    </>
  )
}

export default DarkModeToggler