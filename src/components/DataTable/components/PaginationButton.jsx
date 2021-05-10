import React from 'react';
import clsx from 'clsx';

const PaginationButton = ({ onChange, isActive, children }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onChange();
  };

  return (
    <li className="mr-1">
      <button
        className={clsx('page-link', isActive && 'button-outline')}
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
};

export default PaginationButton;
