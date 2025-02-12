import React, { useState, useEffect } from 'react';
import { searchBooks } from '../api/googleBooksAPI';
import { Book } from '../interfaces/Book';
// import { ShelfContext } from '../context/ShelfContext';
// import { WantToReadContext } from '../context/WantToReadContext';
import SearchBookItem from '../components/SearchBookItem';
import '../index.css'; // Import the CSS file
import { ShelvedBookInterface } from '../interfaces/ShelvedBookInterface';
import auth from '../utils/auth';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  // const { addToShelf } = useContext(ShelfContext);
  // const { addToWantToRead } = useContext(WantToReadContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const books = await searchBooks(query);
    setResults(books);
  };

  useEffect(() => {
    console.log('Results:', results
    );
  }, [results]);

  const handleShelf = (book: Book, shelfType: 'favorite' | "wantToRead") => {
    //make post request to /api/shelf
    const authors: string[] = book.volumeInfo.authors as string[];
    const shelvedBook: ShelvedBookInterface = {
      title: book.volumeInfo.title,
      authors: authors.join(', ') ,
      description: book.volumeInfo.description as string,
      image: book?.volumeInfo?.imageLinks?.thumbnail || '',
      userId: auth.getProfile().id as number,
      isFavorite: shelfType === 'favorite',
      isWantToRead: shelfType === 'wantToRead',
    }

    console.log("book:", book);
    fetch('/api/shelf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify(shelvedBook),
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
            onAddToShelfClick={() => handleShelf(book, 'favorite')}
            onWantToReadClick={() => handleShelf(book, 'wantToRead')}
          />
        ))}
      </div>
    </section>
  );
};

export default Search;