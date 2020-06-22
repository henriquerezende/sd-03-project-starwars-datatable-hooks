import React, { useContext } from 'react';

import TableHeader from './TableHeader';
import TableRow from './TableRow';
import * as constants from '../services/constants';

import { dataPlanetsContext } from '../context/DataPlanets';
import { filtersContext } from '../context/Filters';
import './Table.css';

const filterByNumProperties = (list, { value, column, comparison }) => {
  const numValue = Number(value);
  switch (comparison) {
    case 'maior que': return list.filter((obj) => Number(obj[column]) > numValue);
    case 'menor que': return list.filter((obj) => Number(obj[column]) < numValue);
    case 'igual a': return list.filter((obj) => Number(obj[column]) === numValue);
    default: return list;
  }
};

const orderByStringProperties = (list, col, direction) => {
  const sortedList = (constants.numColumn.some((option) => option === col))
    ? list.sort((elemA, elemB) => elemA[col] - elemB[col])
    : list.sort((elemA, elemB) => elemA[col].localeCompare(elemB[col]));

  if (direction === 'DESC') sortedList.reverse();
  return sortedList;
};

const renderBody = (planets, properties/*, isClassic*/) => (
  <tbody
    // style={/*isClassic ?*/{ border: '1px solid #ccc' }/*{ display: 'block', flexBasis: '60%' }*/}
  >
    {planets
      .map((planet, index) => (
        <TableRow
          key={planet.name}
          planet={planet}
          properties={properties}
          // isClassic={isClassic}
          index={index}
        />
      ))
    }
  </tbody>
);

// const generateStyle = (isClassic) => (
//   isClassic ? { display: 'inline-block' } : ({
//     border: '1px solid #ccc',
//     display: 'flex',
//     flexDirection: 'column',
//     flexBasis: '60%',
//   })
// );

// const makeHeadersInMultiHeadersTable = (headers, ...stringStyles) => {
//   const nthOfTypeBefore = (order, title) => (`
//   td:nth-of-type(${order}):before {
//     content: "${title}";
//   }`);

//   return (
//     <style>
//       {stringStyles.reduce((str, style) => str.concat(style), '')
//       + headers.reduce((string, prop, index) => (
//           string.concat(nthOfTypeBefore(index + 1, constants.frendlyUser(prop)))
//       ), '')}
//     </style>
//   );
// };

const Table = (
  // { numFilters, column, sort, isClassic },
) => {
  const { state: { data: planets, headers } } = useContext(dataPlanetsContext);
  const [{
    filterByName: { name: searchText },
    filterByNumericValues: numFilters,
    order: { column, sort },
  }, ] = useContext(filtersContext);

  if (planets.length === 0) return <div>None Planet Found</div>;

  let planetsToShow = planets.filter((planet) => planet.name.includes(searchText));
  planetsToShow = orderByStringProperties(planetsToShow, column.toLowerCase(), sort);
  numFilters.forEach((filter) => {
    planetsToShow = filterByNumProperties(planetsToShow, filter);
  });

  // const extraStyle = (`
  //   td:before {
  //     left: 6px;padding-right: 10px;position: absolute;top: 6px;white-space: nowrap;width: 45%;
  //   }`);

  return (
    <React.Fragment>
      {/* {isClassic || makeHeadersInMultiHeadersTable(headers, extraStyle)} */}
      <table
        className="table"
        // style={generateStyle(isClassic)}
      >
        <caption>Star Wars Planets</caption>
        <TableHeader
          headers={headers}
          // isClassic={isClassic}
        />
        {renderBody(planetsToShow, headers,/* isClassic, */)}
      </table>
    </React.Fragment>
  );
};

// const mapStateToProps = ({
//   format,
// }) => ({
//   isClassic: format,
// });

// Table.propTypes = {
//   isClassic: PropTypes.bool,
// };

// PropTypes.defaultProps = { isClassic: false };

export default Table;
