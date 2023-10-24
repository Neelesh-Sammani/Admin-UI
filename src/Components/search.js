import React from 'react';
import './search.css';

function SearchBar({searchValue, handleSearch }) {

  return (
    <div className='search-container'>
    <input
      type="text"
      className="search-bar"
      value={searchValue}
      placeholder="Search by name, email or role"
      onChange={handleSearch}
    />
    </div>
  );
}

export default SearchBar;