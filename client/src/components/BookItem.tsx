import React from 'react';
// import { Book } from '../interfaces/Book';
import './BookItem.css'; // Import the CSS file
import { ShelvedBookInterface } from '../interfaces/ShelvedBookInterface';

interface BookItemProps {
  shelvedBook: ShelvedBookInterface;
  buttonText: string;
  buttonClass: string;
  onButtonClick: () => void;
}

const BookItem: React.FC<BookItemProps> = ({ shelvedBook, buttonText, buttonClass, onButtonClick }) => {
  console.log("shelved book", shelvedBook);
  return (
    <div className="book-item">
      {shelvedBook?.image && (
        <img src={shelvedBook.image} alt={shelvedBook.title} className="book-image" />
      )}
      <div className="book-details">
        <h3 className="book-title">{shelvedBook.title}</h3>
        <p className="book-authors">{shelvedBook.authors}</p>
      </div>
      <button className={`btn ${buttonClass}`} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default BookItem;