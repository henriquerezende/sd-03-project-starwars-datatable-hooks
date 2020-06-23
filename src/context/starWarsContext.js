import React, { createContext, useState, useEffect } from 'react';
import useFilters from '../Hooks/useFilters';
import PropTypes from 'prop-types';

export const starWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const allFilters = useFilters();

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json()
        .then((data) => setPlanets(data.results), setLoading(false)));
  }, []);

  const context = {
    allFilters,
    planets,
    loading,
  };

  return (
    <starWarsContext.Provider value={context}>
      {children}
    </starWarsContext.Provider>
  );
};

starWarsContext.propType = {
  children: PropTypes.node.isRequired,
}

export default StarWarsProvider;