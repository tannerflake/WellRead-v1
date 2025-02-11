import React, { useState, useContext } from 'react';
import { searchBooks } from '../api/googleBooksAPI';
import { Book } from '../interfaces/Book';
import { ShelfContext } from '../context/ShelfContext';
// import { WantToReadContext } from '../context/WantToReadContext';
import SearchBookItem from '../components/SearchBookItem';
import '../index.css'; // Import the CSS file
import { ShelvedBookInterface } from '../interfaces/ShelvedBookInterface';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const { addToShelf } = useContext(ShelfContext);
  // const { addToWantToRead } = useContext(WantToReadContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const books = await searchBooks(query);
    setResults(books);
  };

  const addToWantToRead = (book: ShelvedBookInterface) => {
    //make post request to /api/shelf
    console.log(`Book is ${book}`);
    fetch('/api/shelf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
        <button onClick={handleSearch} className="find-book-button">Find Book</button>
      </div>
      <div className="search-results">
        {results.map((book) => (
          <SearchBookItem
            key={book.id}
            book={book}
            onAddToShelfClick={() => addToShelf(book)}
            onWantToReadClick={() => addToWantToRead(book as ShelvedBookInterface)}
          />
        ))}
      </div>
    </section>
  );
};

export default Search;