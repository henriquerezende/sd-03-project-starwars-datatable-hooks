import React, { createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';

const PlanetsContext = createContext();

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const url = 'https://swapi-trybe.herokuapp.com/api/planets';

  useEffect(() => {
    const fetchData = async () => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          console.log(json.results);
          setData(json.results);
        });
    };
    fetchData();
  }, []);

  const contextValue = {
    data,
  };

  return (
    <PlanetsContext.Provider value={contextValue}>
      {children}
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: propTypes.isRequired,
};

export { PlanetsContext, PlanetsProvider };