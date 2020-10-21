import React from 'react';
import Planets from './components/Planets';
import Filters from './components/Filters';
import PlanetsProvider from './context/PlanetsContext';
import FiltersProvider from './context/FiltersContext';

const App = () => (
  <PlanetsProvider>
    <FiltersProvider>
      <Filters />
      <Planets />
    </FiltersProvider>
  </PlanetsProvider>
);

export default App;
