import React, { useState } from 'react';
import "./SearchBar.css";
function SearchBar({ onSearch }) {
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchKey);
    setSearchKey("");
  };

  return (
    <form className="container mb-4" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Buscar"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button className="btn btn-primary">Buscar</button>
    </form>
  );
}

export default SearchBar;
