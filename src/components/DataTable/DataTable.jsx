import React, { useState, useMemo } from 'react';
import { chunk } from 'lodash';

import Pagination from './components/Pagination';
import Row from './components/Row';
import Search from './components/Search';

const calculateTotalNumberOfPages = (rowsLength, rowsPerPage) => {
  if (rowsPerPage === 0) return 0;
  return Math.ceil(rowsLength / rowsPerPage);
};

const filterRow = (searchTerm) => (row) => {
  const searchTermLowerCase = searchTerm.toLowerCase();
  return (
    row.name?.toLowerCase().includes(searchTermLowerCase) ||
    row.email?.toLowerCase().includes(searchTermLowerCase)
  );
};

const DataTable = ({ rows, rowsPerPage = 40 }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const rowsToRender = useMemo(
    () => chunk(rows.filter(filterRow(searchTerm)), rowsPerPage),
    [searchTerm, rowsPerPage, rows]
  );

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPageNumber(0);
  };

  return (
    <div>
      <Search onSearch={handleSearch} value={searchTerm} />
      <table>
        <tbody>
          {rowsToRender[currentPageNumber]?.map((row) => (
            <Row key={row.per_id} {...row} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPageNumber={currentPageNumber}
        totalNumberOfPages={calculateTotalNumberOfPages(
          rowsToRender.flat().length,
          rowsPerPage
        )}
        onChange={setCurrentPageNumber}
      />
    </div>
  );
};

export default DataTable;
