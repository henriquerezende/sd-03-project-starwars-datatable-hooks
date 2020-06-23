import React, { useContext } from 'react';
import { DataContext } from './TableData';
import { FilterContext } from './Filters';

const header = ['name', 'population', 'climate', 'diameter', 'created', 'gravity', 'orbital_period', 'rotation_period',
  'surface_water', 'terrain', 'films', 'edited', 'url'];

function doCompare(e, el) {
  switch (el.comparison) {
    case 'maior que': return parseInt(e[el.column], 10) > parseInt(el.value, 10);
    case 'menor que': return parseInt(e[el.column], 10) < parseInt(el.value, 10);
    case 'igual a': return parseInt(e[el.column], 10) === parseInt(el.value, 10);
    default: return [];
  }
}

export default function Table() {
  const { data } = useContext(DataContext);
  const { nameFilter, filterByNumericValues, order } = useContext(FilterContext);

  function sortAsc(a, b) {
    return Number(a[order.column]) - Number(b[order.column]);
  }

  function sortDesc(a, b) {
    return Number(b[order.column]) - Number(a[order.column]);
  }

  if (order.sort === 'ASC') { data.sort(sortAsc); }
  if (order.sort === 'DESC') { data.sort(sortDesc); }

  function renderTableheaders() {
    return (
      <thead>
        <tr>
          {header.map((e) => <th>{e}</th>)}
        </tr>
      </thead>
    );
  }

  function filterData() {
    if (filterByNumericValues) {
      const filteredData = filterByNumericValues
        .reduce((acc, el) => acc.filter((e) => doCompare(e, el)), data);
      if (filteredData) return filteredData;
      return [];
    }
    return [];
  }

  function renderTableData() {
    return (

      !nameFilter && (filterByNumericValues.length === 0) && data.map((e) => (
        <tr key={e.name}>
          {header.map((el) => <td key={e.name + el}>{e[el]}</td>)}
        </tr>
      ))
    );
  }

  function renderFilteredDataByName() {
    return (
      nameFilter && data.filter((e) => e.name.toLowerCase()
        .includes(nameFilter.toLowerCase())).map((e) => (
          <tr key={e.name}>
            {header.map((el) => <td key={e.name + el}>{e[el]}</td>)}
          </tr>
        ))
    );
  }

  function renderFilteredDataByNumeric() {
    return (
      filterByNumericValues.length > 0 && filterData().map((e) => (
        <tr key={e.name}>
          {header.map((el) => <td key={e.name + el}>{e[el]}</td>)}
        </tr>
      ))
    );
  }

  return (
    <div>
      <table>
        {renderTableheaders()}
        <tbody>
          {renderTableData()}
          {renderFilteredDataByName()}
          {renderFilteredDataByNumeric()}
        </tbody>
      </table>
    </div>
  );
}
