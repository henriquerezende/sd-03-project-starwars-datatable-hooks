import React, { useState } from 'react';
import AllFiltersArrContext from '../context/AllFiltersArrContext';

const AllFiltersArrProvider = ({ children }) => {
  const allFilters = [
    '', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const [allFiltersArr, setAllFilters] = useState([...allFilters]);

  const setAllFiltersFunc = (newArr) => setAllFilters(newArr);

  const AllFiltersContextObj = {
    allFiltersArr,
    setAllFiltersFunc,
  };

  return (
    <AllFiltersArrContext.Provider value={AllFiltersContextObj}>
      {children}
    </AllFiltersArrContext.Provider>
  );
};

export default AllFiltersArrProvider;