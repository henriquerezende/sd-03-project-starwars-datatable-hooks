import React from 'react';
import PropTypes from 'prop-types';

const TableLine = ({ planet }) => (
  <tr>
    <td data-testid="planet-name">{planet.name}</td>
    <td>{planet.climate}</td>
    <td>{planet.created}</td>
    <td>{planet.diameter}</td>
    <td>{planet.edited}</td>
    <td>{planet.films}</td>
    <td>{planet.gravity}</td>
    <td>{planet.orbital_period}</td>
    <td>{planet.population}</td>
    <td>{planet.rotation_period}</td>
    <td>{planet.surface_water}</td>
    <td>{planet.terrain}</td>
    <td>{planet.url}</td>
  </tr>
);

TableLine.propTypes = {
  planet: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableLine;
