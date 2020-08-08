import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext(null);

PlanetsContext.displayName = 'PlanetContext';

const PlanetsProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [planets, setPlanets] = useState([]);

  const context = { isFetching, setIsFetching, planets, setPlanets };

  return <PlanetsContext.Provider value={context}>{children}</PlanetsContext.Provider>;
};

PlanetsProvider.propTypes = { children: PropTypes.node.isRequired };

export default PlanetsProvider;
