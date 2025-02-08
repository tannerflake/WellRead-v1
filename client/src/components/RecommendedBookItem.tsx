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
        <button className="btn btn-danger" onClick={onDismissClick}>X</button>
        <button className="btn btn-secondary" onClick={onWantToReadClick}>Want to Read</button>
        <button className="btn btn-primary" onClick={onAddToShelfClick}>Add to Shelf</button>
      </div>
    </div>
  );
};

export default RecommendedBookItem;