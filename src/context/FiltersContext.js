import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FiltersContext = createContext(null);

FiltersContext.displayName = 'FiltersContext';

const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: {
      column: 'Name',
      sort: 'ASC',
    },
    avaliableFilters: {
      columnFilters: [
        { name: 'all', avaliable: true },
        { name: 'population', avaliable: true },
        { name: 'orbital_period', avaliable: true },
        { name: 'diameter', avaliable: true },
        { name: 'rotation_period', avaliable: true },
        { name: 'surface_water', avaliable: true },
      ],
      comparisonFilters: ['all', 'maior que', 'igual a', 'menor que'],
    },
  });

  const changeFilterByName = (name) => setFilters({ ...filters, filterByName: { name } });

  const addFilterByNumeric = (column, comparison, value, columns) => setFilters(
    {
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, { column, comparison, value }],
      avaliableFilters: { ...filters.avaliableFilters, columnFilters: [...columns] },
    },
  );

  const rmFilterByNumeric = (newActiveFilters, newAvaliableFilters) => setFilters(
    {
      ...filters,
      filterByNumericValues: [...newActiveFilters],
      avaliableFilters: { ...filters.avaliableFilters, columnFilters: [...newAvaliableFilters] },
    },
  );

  const changeSort = (order) => setFilters({ ...filters, order });

  const context = {
    filters,
    setFilters,
    changeFilterByName,
    addFilterByNumeric,
    rmFilterByNumeric,
    changeSort,
  };

  return <FiltersContext.Provider value={context}>{children}</FiltersContext.Provider>;
};

FiltersProvider.propTypes = { children: PropTypes.node.isRequired };

export default FiltersProvider;
