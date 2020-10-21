import React, { useContext, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';

const selectColumn = (handleChange, avaliableFilters) => (
  <div>
    <select
      className="browser-default"
      data-testid="column-filter"
      id="column"
      onChange={(e) => handleChange(e)}
      defaultValue=""
    >
      <option value="" disabled>
        Choose your option
      </option>
      {avaliableFilters.columnFilters.reduce((acc, { name, avaliable }) => {
        if (avaliable)
          acc.push(
            <option key={name} value={name}>
              {name}
            </option>,
          );
        return acc;
      }, [])}
    </select>
    <label>Browser Columns</label>
  </div>
);

const selectComparison = (handleChange, avaliableFilters) => (
  <div>
    <select
      data-testid="comparison-filter"
      id="comparison"
      className="browser-default"
      onChange={(e) => handleChange(e)}
      defaultValue=""
    >
      <option value="" disabled>
        Choose your option
      </option>
      {avaliableFilters.comparisonFilters.map((filter) => (
        <option key={filter} value={filter}>
          {filter}
        </option>
      ))}
    </select>
    <label>Browser Comparisons</label>
  </div>
);

const filterValueInput = (handleChange) => (
  <div>
    <input data-testid="value-filter" id="value" type="number" onChange={(e) => handleChange(e)} />
    <label htmlFor="value">Value</label>
  </div>
);

const filterButton = (avaliableFilters, addFilterByNumeric, setState, state) => {
  const { column, comparison, value } = state;
  return (
    <button
      data-testid="button-filter"
      type="button"
      className="waves-effect waves-light yellow darken-1 black-text btn"
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
      Filter
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
  <div>
    <select
      className="browser-default"
      data-testid="column-sort"
      id="orderColumn"
      onChange={(e) => handleChange(e)}
      defaultValue=""
    >
      <option value="" disabled>
        Choose your option
      </option>
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
    <label>Browser Columns</label>
  </div>
);

const sortRadios = (handleSortRadioClick) => (
  <div>
    <label>
      <input
        type="radio"
        data-testid="column-sort-input-asc"
        name="order"
        value="ASC"
        onClick={(e) => handleSortRadioClick(e)}
      />
      <span>Ascending</span>
    </label>
    <label>
      <input
        type="radio"
        data-testid="column-sort-input-desc"
        name="order"
        value="DESC"
        onClick={(e) => handleSortRadioClick(e)}
      />
      <span>Descending</span>
    </label>
  </div>
);

const sortInput = (state, changeSort) => {
  const { orderColumn, orderSort } = state;
  return (
    <input
      type="button"
      value="sort"
      data-testid="column-sort-button"
      className="waves-effect waves-light yellow darken-1 black-text btn"
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

  const nameFilterInput = () => (
    <nav>
      <div className="nav-wrapper grey darken-1">
        <form>
          <div className="input-field">
            <input id="name-filter" type="search" data-testid="name-filter" onChange={(e) => changeFilterByName(e.target.value)} required />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );

  return (
    <div>
      {nameFilterInput()}
      <center className="grey darken-3 row">
        <div className="col s12">
          <h5 className="">Filter</h5>
        </div>
        <div className="col s6 m4 xl2 offset-xl3 offset-l2">
          {selectColumn(handleChange, avaliableFilters)}
        </div>
        <div className="col s6 m4 xl2">{selectComparison(handleChange, avaliableFilters)}</div>
        <div className="col s12 m3 xl1 offset-l3">{filterValueInput(handleChange)}</div>
        <div className="col s12 m12 l3 xl1">
          {filterButton(avaliableFilters, addFilterByNumeric, setState, state)}
        </div>
        <div className="col s12">
          {activeFiltersTable(filterByNumericValues, avaliableFilters, rmFilterByNumeric)}
        </div>
        <div className="col s12">
          <h5 className="">Sort</h5>
        </div>
        <div className="col s6 m4 l2 offset-l3">{columnSort(handleChange)}</div>
        <div className="col s6 m4 l2">{sortRadios(handleSortRadioClick)}</div>
        <div className="col s12 m2 l2">{sortInput(state, changeSort)}</div>
      </center>
    </div>
  );
};

export default Filters;
