import React from 'react';

const Search = ({ onSearch, value }) => {
  const handleChange = ({ target }) => onSearch(target.value);

  return (
    <div className="p-b-1">
      <input
        type="search"
        className="form-control"
        placeholder="Søg brugere"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
