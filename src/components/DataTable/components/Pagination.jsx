import React from 'react';

import PaginationButton from './PaginationButton';

const Pagination = ({ currentPageNumber, totalNumberOfPages, onChange }) => {
  if (totalNumberOfPages < 2) return null;

  const pages = Array.from(Array(totalNumberOfPages).keys()).map(
    (pageNumber) => (
      <PaginationButton
        key={pageNumber}
        isActive={currentPageNumber === pageNumber}
        onChange={() => onChange(pageNumber)}
      >
        {pageNumber + 1}
      </PaginationButton>
    )
  );

  return <ul className="pagination">{pages}</ul>;
};

export default Pagination;
