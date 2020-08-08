import React, { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import TableLine from './TableLine';
import getPlanets from '../services/apiRequests';
import { FiltersContext } from '../context/FiltersContext';

const lessThan = (planet, column, value) => {
  if (Number(planet[column]) >= Number(value) || planet[column] === 'unknown') return false;
  return true;
};

const largerThan = (planet, column, value) => {
  if (Number(planet[column]) <= Number(value) || planet[column] === 'unknown') return false;
  return true;
};

const equal = (planet, column, value) => {
  if (Number(planet[column]) !== Number(value)) return false;
  return true;
};

const switchComparison = (planet, column, comparison, value) => {
  if (comparison === 'menor que') return lessThan(planet, column, value);
  if (comparison === 'maior que') return largerThan(planet, column, value);
  if (comparison === 'igual a') return equal(planet, column, value);
  return true;
};

const isFiltered = (planet, nameFilter, filterByNumericValues) => {
  if (nameFilter && !planet.name.match(new RegExp(nameFilter, 'i'))) return false;
  for (let i = 0; i < filterByNumericValues.length; i += 1) {
    const { column, comparison, value } = filterByNumericValues[i];
    if (!switchComparison(planet, column, comparison, value)) return false;
  }
  return true;
};

const ascOrder = (columnA, columnB) => {
  if (columnA > columnB) return 1;
  return -1;
};

const descOrder = (columnA, columnB) => {
  if (columnA < columnB) return 1;
  return -1;
};

const sortPlanets = (planetA, planetB, { column, sort }) => {
  let columnA = planetA.props.planet[column.toLowerCase()];
  let columnB = planetB.props.planet[column.toLowerCase()];
  if (Number(planetA.props.planet[column])) {
    columnA = Number(columnA);
    columnB = Number(columnB);
  }
  if (sort === 'ASC') return ascOrder(columnA, columnB);
  if (sort === 'DESC') return descOrder(columnA, columnB);
  return 0;
};

const showPlanets = (data, nameFilter, filterByNumericValues, order) => data
  .reduce((acc, planet) => {
    if (isFiltered(planet, nameFilter, filterByNumericValues)) {
      acc.push(<TableLine key={planet.name} planet={planet} />);
    }
    return acc;
  }, [])
  .sort((planetA, planetB) => sortPlanets(planetA, planetB, order));

const Table = () => {
  const { isFetching, setIsFetching, planets, setPlanets } = useContext(PlanetsContext);
  const { filters: { filterByName, filterByNumericValues, order } } = useContext(FiltersContext);
  useEffect(() => {
    getPlanets().then((data) => {
      setPlanets(data);
      setIsFetching(false);
    });
  }, []);

  if (isFetching) return <p>loading</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>climate</th>
          <th>created</th>
          <th>diameter</th>
          <th>edited</th>
          <th>films</th>
          <th>gravity</th>
          <th>orbital_period</th>
          <th>population</th>
          <th>rotation_period</th>
          <th>surface_water</th>
          <th>terrain</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>{showPlanets(planets.results, filterByName.name, filterByNumericValues, order)}</tbody>
    </table>
  );
};

export default Table;
