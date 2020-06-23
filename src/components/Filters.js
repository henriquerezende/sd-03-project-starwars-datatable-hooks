import React, { useContext } from 'react';
import FiltersContext from '../context/toFilter/FiltersContext';

const renderColumn = () => {
  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  return (
    <div>
      <select data-testid="column-filter">
        <option value="Coluna">Coluna</option>
        {columns.map((column) =>
          <React.Fragment key={`${column}`}>
            <option>{`${column}`}</option>
          </React.Fragment>)
        }
      </select>
      <select data-testid="comparison-filter">
        <option value="Select">Intervalo</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
    </div>
  );
};

const renderFilterBar = () => (
  <div>
    <input
      data-testid="value-filter"
      type="number"
      placeholder="Digite um Número"
    />
    <button data-testid="button-filter">Filtrar</button>
  </div>
);
function Filters() {
  const { handleNameFilter } = useContext(FiltersContext);

  return (
    <form>
      {renderColumn()}
      {renderFilterBar()}
      <input
        onChange={(event) => handleNameFilter(event.target.value)}
        data-testid="name-filter"
        type="text"
        placeholder="Filtro"
      />
    </form>
  );
}

export default Filters;
