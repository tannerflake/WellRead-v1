import React from 'react';
import { Book } from '../interfaces/Book';
import '../index.css'; // Import the CSS file

interface BookItemProps {
  book: Book;
  buttonText: string;
  buttonClass: string;
  onButtonClick: () => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, buttonText, buttonClass, onButtonClick }) => {
  return (
    <div className="book-item">
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="book-image" />
      )}
      <div className="book-details">
        <h3 className="book-title">{book.volumeInfo.title}</h3>
        <p className="book-authors">{book.volumeInfo.authors?.join(', ')}</p>
      </div>
      <button className={`btn ${buttonClass}`} onClick={onButtonClick}>{buttonText}</button>
    </div>
  );
};

export default BookItem;