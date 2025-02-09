import React from 'react';
import { Book } from '../interfaces/Book';
import './RecommendedBookItem.css'; // Import the CSS file

interface RecommendedBookItemProps {
  book: Book;
  onAddToShelfClick: () => void;
  onWantToReadClick: () => void;
  onDismissClick: () => void;
}

const RecommendedBookItem: React.FC<RecommendedBookItemProps> = ({ book, onAddToShelfClick, onWantToReadClick, onDismissClick }) => {
  return (
    <div className="recommended-book-item">
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="book-image" />
      )}
      <div className="book-details">
        <h3 className="book-title">{book.volumeInfo.title}</h3>
        <p className="book-authors">{book.volumeInfo.authors?.join(', ')}</p>
        <p className="book-description">{book.volumeInfo.description}</p>
      </div>
      <div className="book-buttons">
        <button id="btn-dismiss" className="btn" onClick={onDismissClick}>Next</button>
        <button id="btn-want-to-read" className="btn" onClick={onWantToReadClick}>Want to Read</button>
        <button id="btn-add-to-shelf" className="btn" onClick={onAddToShelfClick}>Favorite</button>
      </div>
    </div>
  );
};

export default RecommendedBookItem;