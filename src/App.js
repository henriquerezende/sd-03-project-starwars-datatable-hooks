import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import PlanetsProvider from './context/PlanetsContext';
import FiltersProvider from './context/FiltersContext';

const App = () => (
  <PlanetsProvider>
    <FiltersProvider>
      <Filters />
      <Table />
    </FiltersProvider>
  </PlanetsProvider>
);

export default App;
