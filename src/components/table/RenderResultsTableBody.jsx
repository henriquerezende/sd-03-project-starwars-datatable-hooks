import React from 'react';
import PropTypes from 'prop-types';

const RenderResultsTableBody = ({ planetData }) => (
  <tbody>
    {planetData.map((planet) => (
      <tr key={planet.name}>
        <td data-testid="planet-name">{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>
          {planet.films.map((film) => (
            <a
              href={film}
              target="_blank"
              rel="noopener noreferrer"
              key={film}
            >
              {film}
            </a>
          ))}
        </td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>
          <a href={planet.url} target="_blank" rel="noopener noreferrer">
            {planet.url}
          </a>
        </td>
      </tr>
    ))}
  </tbody>
);

RenderResultsTableBody.propTypes = {
  planetData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RenderResultsTableBody;