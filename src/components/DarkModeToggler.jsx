import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../features/darkMode/darkModeSlice'
const DarkModeToggler = () => {

    const dispatch = useDispatch();

    const handleNightModeToggle = () => {
        dispatch(toggleDarkMode()); 
    }

  return (
    <>
        <div onClick={handleNightModeToggle}>
            <span>&#x1F319;</span> &nbsp;
            Toggle
        </div>
    </>
  )
}

export default DarkModeToggler