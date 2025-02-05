import React, { useState } from 'react';
import '../index.css'; // Import the CSS file

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', query);
    // Add your search logic here
  };

  return (
    <section className="search-container">
      <h1>Search</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a book..."
          className="search-input"
        />
        <button onClick={handleSearch} className="btn btn-primary">Find Book</button>
      </div>
    </section>
  );
};

export default Search;