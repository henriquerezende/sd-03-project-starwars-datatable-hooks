import React, { createContext, useState, useEffect } from 'react';
import getPlanets from '../services/apiRequests';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext(null);

PlanetsContext.displayName = 'PlanetContext';

const PlanetsProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getPlanets().then((data) => {
      setPlanets(data);
      setIsFetching(false);
    });
  }, [])

  const context = { isFetching, planets };

  return <PlanetsContext.Provider value={context}>{children}</PlanetsContext.Provider>;
};

PlanetsProvider.propTypes = { children: PropTypes.node.isRequired };

export default PlanetsProvider;
