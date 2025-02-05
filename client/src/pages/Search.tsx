import React, { useState } from 'react';
import { searchBooks } from '../api/googleBooksAPI';
import '../index.css'; // Import the CSS file
import { Book } from '../interfaces/Book';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const books = await searchBooks(query);
    setResults(books);
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
      <div className="search-results">
        {results.map((book) => (
          <div key={book.id} className="book-item">
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="book-image" />
            )}
            <div className="book-details">
              <h3 className="book-title">{book.volumeInfo.title}</h3>
              <p className="book-authors">{book.volumeInfo.authors?.join(', ')}</p>
            </div>
            <button className="btn btn-secondary add-to-shelf">Add to Shelf</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Search;