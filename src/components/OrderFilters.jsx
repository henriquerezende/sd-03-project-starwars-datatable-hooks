import React, { useContext } from 'react';

import { dataPlanetsContext } from '../context/DataPlanets';
import { filtersContext } from '../context/Filters';
import { activateOrder, changeOrder } from '../actions/orderActions';
import { renderOptions } from '../services/constants';

const renderRadio = (value, text, dispatch) => (
  <label htmlFor={`sort-radio-${value}`}>
    {text}
    <input
      className="radius-border"
      data-testid="column-sort-input"
      id={`column-sort-input-${value.toLowerCase()}`}
      name="sort-filter-radio"
      onChange={() => dispatch(changeOrder('sort', value))}
      type="radio"
      value={value}
    />
  </label>
);

function OrderFilters() {
  const [{ headers }] = useContext(dataPlanetsContext);
  const [{ order: { column } }, dispatch] = useContext(filtersContext);

  return (
    <fieldset className="container">
      <span>Order By Column</span>
      <div>
        {renderRadio('ASC', 'Ascendent', dispatch)}
        {renderRadio('DESC', 'Descendent', dispatch)}
        <label htmlFor="column-order" className="container">
          column
          <select
            className="radius-border"
            data-testid="column-sort"
            defaultValue={column}
            id="column-order"
            name="column-order"
            onChange={({ target }) => dispatch(changeOrder('column', target.value))}
          >
            {renderOptions(headers)}
          </select>
        </label>
        <button
          className="radius-border filter-button"
          data-testid="column-sort-button"
          onClick={() => dispatch(activateOrder())}
          type="button"
        >
          Apply Order
        </button>
      </div>
    </fieldset>
  );
}

export default OrderFilters;
