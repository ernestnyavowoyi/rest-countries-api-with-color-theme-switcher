import React from 'react'
import { setSelectedRegion, clearSelectedRegion } from '../features/regionFilter/regionFilterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { filterCountriesByRegion as filter } from '../features/regionFilter/regionFilterSlice';


const RegionFilterDropdown = React.memo(() => {

    const regionFilter = useSelector((state) => state.regionFilter);
    
    const dispatch = useDispatch();
    const options = [
        { value: "", label: "All"},
        { value: "africa", label: "Africa"},
        { value: "america", label: "America"},
        { value: "asia", label: "Asia"},
        { value: "europe", label: "Europe"},
        { value: "oceania", label: "Oceania"},
    ];

    const handleChange = React.useCallback((event) => {
        const val = event.target.value.trim();
        if(val) {
            dispatch(setSelectedRegion(val));
            dispatch(filter(val));
        } else {
            dispatch(clearSelectedRegion());
        }
    }, [])

  return (
    <div className="region_filter_div">
        <select value={regionFilter.selectedRegion} onChange={handleChange} name="region_filter" id="region_filter" className="region_filter_select" placeholder="Filter by Region">
            {options.map((option) => {
                return <option className='option' key={option.value} value={option.value}>{option.label}</option>
            })}
        </select>
    </div>
  )
})

export default RegionFilterDropdown