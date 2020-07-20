import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { filterName, filterNumValues, deleteFilter, disableColumn, enableColumn, changeOrder } from '../actions';
import { FiltersContext } from '../context/FiltersContext';

const Filters = () => {
  const {
    filters,
    setFilters,
    setFilterByName,
  } = useContext(FiltersContext);

  // const getOrdered = () => {
  //   const { changeOrd } = this.props;
  //   const { orderColumn, orderSort } = this.state;
  //   return (
  //     <div>
  //       <p>Select order:</p>
  //       {selectOrder()}
  //       <input
  //         data-testid="column-sort-input"
  //         type="radio" name="order" value="ASC"
  //         onClick={(event) => this.setState({ orderSort: event.target.value })}
  //       />
  //       <input
  //         data-testid="column-sort-input"
  //         type="radio" name="order" value="DESC"
  //         onClick={(event) => this.setState({ orderSort: event.target.value })}
  //       />
  //       <button
  //         data-testid="column-sort-button"
  //         type="button"
  //         onClick={() => changeOrd({ column: orderColumn, sort: orderSort })}
  //       >
  //         Order
  //       </button>
  //     </div>
  //   );
  // }

  // const selectOrder = () => {
  //   return (
  //     <div>
  //       <select
  //         data-testid="column-sort" id="orderColumn"
  //         onChange={(event) => this.setState({ orderColumn: event.target.value })}
  //       >
  //         <option>name</option>
  //         <option>climate</option>
  //         <option>created</option>
  //         <option>diameter</option>
  //         <option>edited</option>
  //         <option>films</option>
  //         <option>gravity</option>
  //         <option>orbital_period</option>
  //         <option>population</option>
  //         <option>rotation_period</option>
  //         <option>surface_water</option>
  //         <option>terrain</option>
  //         <option>url</option>
  //       </select>
  //     </div>
  //   );
  // }

  // const selectAnOption = () => {
  //   const { column } = this.state;
  //   const { avaliableFilters } = this.props;
  //   return (
  //     <select
  //       data-testid="column-filter"
  //       value={column}
  //       onChange={(event) => this.setState({ column: event.target.value })}
  //     >
  //       <option value="" />
  //       {avaliableFilters.reduce((acc, filter) => {
  //         if (filter.avaliable) {
  //           acc.push(<option value={filter.name} key={filter.name}>{filter.name}</option>);
  //         }
  //         return acc;
  //       }, [])}
  //     </select>
  //   );
  // }

  // const selectACondition = () => {
  //   const { comparison } = this.state;
  //   return (
  //     <select
  //       data-testid="comparison-filter"
  //       value={comparison}
  //       onChange={(event) => this.setState({ comparison: event.target.value })}
  //     >
  //       <option value="" />
  //       <option value="maior que">maior que</option>
  //       <option value="menor que">menor que</option>
  //       <option value="igual a">igual a</option>
  //     </select>
  //   );
  // }

  // const inputNumber = () => {
  //   return (
  //     <input
  //       data-testid="value-filter"
  //       type="number"
  //       placeholder="Digit a number"
  //       onChange={(event) => this.setState({ value: event.target.value })}
  //     />
  //   );
  // }

  // const disableOption = (column) => {
  //   const { avaliableFilters, disableCol } = this.props;
  //   const response = avaliableFilters;

  //   response[response.findIndex((filter) => filter.name === column)].avaliable = false;
  //   disableCol(response);
  // }

  // const enableOption = (column, index) => {
  //   const { deleteFil, filterByNumeric, avaliableFilters, enableCol } = this.props;
  //   const response = avaliableFilters;

  //   response[response.findIndex((filter) => filter.name === column)].avaliable = true;
  //   enableCol(response);

  //   const response2 = filterByNumeric;
  //   response2.splice(index, 1);
  //   deleteFil(response2);
  // }

  // const filterBtn = () => {
  //   const { getFilterByNumber } = this.props;
  //   const { column, comparison, value } = this.state;
  //   return (
  //     <button
  //       data-testid="button-filter" type="button"
  //       onClick={() => {
  //         getFilterByNumber({ column, comparison, value });
  //         disableOption(column);
  //       }}
  //     >
  //       Filtrar
  //     </button>
  //   );
  // }

  // const { getFilterByName, filterByNumeric } = this.props;

  return (
    <div>
      <h3>Filter results</h3>
      <input
        data-testid="name-filter" type="text" placeholder="Digit a planet name"
        value={filters.filterByName.name}
        onChange={(event) => setFilterByName(event.target.value)}
      />
      {/* <p>Select an option:</p>
      {selectAnOption()}
      <p>Select a condition:</p>
      {selectACondition()}
      {inputNumber()}
      {filterBtn()}
      {filterByNumeric.map((filter, index) => (
        <div data-testid="filter">
          {`${filter.column} ${filter.comparison} ${filter.value}`}
          <button type="button" onClick={() => enableOption(filter.column, index)} >
            X
          </button>
        </div>
      ))}
      {getOrdered()} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  filterByNumeric: state.filters.filterByNumericValues,
  avaliableFilters: state.filters.avaliableFilters,
});

const mapDispatchToProps = (dispatch) => ({
  getFilterByName: (name) => dispatch(filterName(name)),
  getFilterByNumber: (getFilterByNumber) => dispatch(filterNumValues(getFilterByNumber)),
  deleteFil: (filters) => dispatch(deleteFilter(filters)),
  disableCol: (column) => dispatch(disableColumn(column)),
  enableCol: (column) => dispatch(enableColumn(column)),
  changeOrd: (order) => dispatch(changeOrder(order)),
});

Filters.propTypes = {
  getFilterByName: PropTypes.func.isRequired,
  getFilterByNumber: PropTypes.func.isRequired,
  filterByNumeric: PropTypes.arrayOf(
    PropTypes.shape({
      column: PropTypes.string,
      comparison: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  avaliableFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avaliableFilters: PropTypes.bool,
    }),
  ).isRequired,
  deleteFil: PropTypes.func.isRequired,
  disableCol: PropTypes.func.isRequired,
  enableCol: PropTypes.func.isRequired,
  changeOrd: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
