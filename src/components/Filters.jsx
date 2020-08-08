import React, { useContext, useState } from 'react';
import Option from './Option';
import { FiltersContext } from '../context/FiltersContext';

const selectColumn = (handleChange, avaliableFilters) => (
  <select data-testid="column-filter" id="column" onChange={(e) => handleChange(e)}>
    {avaliableFilters.columnFilters.reduce((acc, { name, avaliable }) => {
      if (avaliable) acc.push(<Option key={name} name={name} />);
      return acc;
    }, [])}
  </select>
);

const selectComparison = (handleChange, avaliableFilters) => (
  <select data-testid="comparison-filter" id="comparison" onChange={(e) => handleChange(e)}>
    {avaliableFilters.comparisonFilters.map((filter) => (
      <Option key={filter} name={filter} />
    ))}
  </select>
);

const filterValueInput = (handleChange) => (
  <input
    data-testid="value-filter"
    id="value"
    type="number"
    onChange={(e) => handleChange(e)}
  />
);

const filterButton = (avaliableFilters, addFilterByNumeric, setState, state) => {
  const { column, comparison, value } = state;
  return (
    <button
      data-testid="button-filter"
      type="button"
      onClick={() => {
        if (column !== 'all' && comparison !== 'all' && value) {
          const newAvaliableFilters = avaliableFilters.columnFilters;
          newAvaliableFilters[
            newAvaliableFilters.findIndex((filter) => filter.name === column)
          ].avaliable = false;
          addFilterByNumeric(column, comparison, value, newAvaliableFilters);
          setState({ ...state, column: 'all' });
        }
      }}
    >
      Filtrar
    </button>
  );
};

const activeFiltersTable = (filterByNumericValues, avaliableFilters, rmFilterByNumeric) => (
  <ul className="list-group">
    {filterByNumericValues.map(({ column, comparison, value }, index) => (
      <li className="list-group-item" key={column} data-testid="filter">
        {`${column} ${comparison} ${value}`}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const newActiveFilters = filterByNumericValues;
            newActiveFilters.splice(index, 1);
            const newAvaliableFilters = avaliableFilters.columnFilters;
            newAvaliableFilters[
              newAvaliableFilters.findIndex((filter) => filter.name === column)
            ].avaliable = true;
            rmFilterByNumeric(newActiveFilters, newAvaliableFilters);
          }}
        >
          X
        </button>
      </li>
    ))}
  </ul>
);

const columnSort = (handleChange) => (
  <select data-testid="column-sort" id="orderColumn" onChange={(e) => handleChange(e)}>
    <option>name</option>
    <option>climate</option>
    <option>created</option>
    <option>diameter</option>
    <option>edited</option>
    <option>films</option>
    <option>gravity</option>
    <option>orbital_period</option>
    <option>population</option>
    <option>rotation_period</option>
    <option>surface_water</option>
    <option>terrain</option>
    <option>url</option>
  </select>
);

const sortRadios = (handleSortRadioClick) => (
  <div>
    <input
      type="radio"
      data-testid="column-sort-input-asc"
      name="order"
      value="ASC"
      onClick={(e) => handleSortRadioClick(e)}
    />
    <input
      type="radio"
      data-testid="column-sort-input-desc"
      name="order"
      value="DESC"
      onClick={(e) => handleSortRadioClick(e)}
    />
  </div>
);

const sortInput = (state, changeSort) => {
  const { orderColumn, orderSort } = state;
  return (
    <input
      type="button"
      value="ordenar"
      data-testid="column-sort-button"
      onClick={() => changeSort({ column: orderColumn, sort: orderSort })}
    />
  );
};

const Filters = () => {
  const {
    changeFilterByName,
    changeSort,
    addFilterByNumeric,
    rmFilterByNumeric,
    filters: { avaliableFilters, filterByNumericValues },
  } = useContext(FiltersContext);
  const [state, setState] = useState({
    column: 'all',
    comparison: 'all',
    value: 0,
    orderColumn: 'name',
    orderSort: 'ASC',
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleSortRadioClick = (e) => {
    setState({
      ...state,
      orderSort: e.target.value,
    });
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={(e) => changeFilterByName(e.target.value)}
      />
      {selectColumn(handleChange, avaliableFilters)}
      {selectComparison(handleChange, avaliableFilters)}
      {filterValueInput(handleChange)}
      {filterButton(avaliableFilters, addFilterByNumeric, setState, state)}
      {activeFiltersTable(filterByNumericValues, avaliableFilters, rmFilterByNumeric)}
      {columnSort(handleChange)}
      {sortRadios(handleSortRadioClick)}
      {sortInput(state, changeSort)}
    </div>
  );
};

export default Filters;
