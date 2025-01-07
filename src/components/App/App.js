import React from 'react';
import DataTable from '../DataTable/DataTable';
import './App.css';

const App = ({ rows }) => {
  return (
    <div className="container mt-3">
      <DataTable rows={rows} rowsPerPage={5} />
    </div>
  );
};

export default App;
