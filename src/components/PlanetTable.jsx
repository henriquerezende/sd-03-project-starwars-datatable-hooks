import React from 'react';
import PropTypes from 'prop-types';

const PlanetTable = ({ planet }) => (
  <div className="col xl4 m6 s12">
    <center>
      <h5>{planet.name}</h5>
    </center>
    <table className="striped">
      <tbody>
        <tr>
          <td>Climate</td>
          <td>{planet.climate}</td>
        </tr>
        <tr>
          <td>Created</td>
          <td>{planet.created}</td>
        </tr>
        <tr>
          <td>Diameter</td>
          <td>{planet.diameter}</td>
        </tr>
        <tr>
          <td>Edited</td>
          <td>{planet.edited}</td>
        </tr>
        <tr>
          <td>Gravity</td>
          <td>{planet.gravity}</td>
        </tr>
        <tr>
          <td>Orbital Period</td>
          <td>{planet.orbital_period}</td>
        </tr>
        <tr>
          <td>Population</td>
          <td>{planet.population}</td>
        </tr>
        <tr>
          <td>Rotation Period</td>
          <td>{planet.rotation_period}</td>
        </tr>
        <tr>
          <td>Surface Water</td>
          <td>{planet.surface_water}</td>
        </tr>
        <tr>
          <td>Terrain</td>
          <td>{planet.terrain}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

PlanetTable.propTypes = {
  planet: PropTypes.objectOf(PropTypes.node).isRequired,
};

export default PlanetTable;
