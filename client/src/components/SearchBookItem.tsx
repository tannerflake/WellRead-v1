import React from 'react';
import { Book } from '../interfaces/Book';
import './SearchBookItem.css'; // Import the CSS file
// import { ShelvedBookInterface } from '../interfaces/ShelvedBookInterface';

interface SearchBookItemProps {
  book: Book;
  onAddToShelfClick: () => void;
  onWantToReadClick: () => void;
}

const SearchBookItem: React.FC<SearchBookItemProps> = ({ book, onAddToShelfClick, onWantToReadClick }) => {
  return (
    <div className="search-book-item">
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="book-image" />
      )}
      <div className="book-details">
        <h3 className="book-title">{book.volumeInfo.title}</h3>
        <p className="book-authors">{book.volumeInfo.authors?.join(', ')}</p>
      </div>
      <button className="btn want-to-read" onClick={onWantToReadClick}>Want to Read</button>
      <button className="btn add-to-shelf" onClick={onAddToShelfClick}>Favorite</button>
    </div>
  );
};

export default SearchBookItem;