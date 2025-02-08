import React, { useContext } from 'react';
import { WantToReadContext } from '../context/WantToReadContext';
import { ShelfContext } from '../context/ShelfContext';
import BookItem from '../components/BookItem';
import '../index.css'; // Import the CSS file

const WantToRead: React.FC = () => {
  const { wantToRead, removeFromWantToRead } = useContext(WantToReadContext);
  const { addToShelf } = useContext(ShelfContext);

  const handleRemoveAndAddToShelf = (bookId: string) => {
    const book = wantToRead.find((book) => book.id === bookId);
    if (book) {
      removeFromWantToRead(bookId);
      addToShelf(book);
    }
  };

  return (
    <section className="want-to-read-container">
      <h1>Want to Read</h1>
      <div className="search-results">
        {wantToRead.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            buttonText="Remove"
            buttonClass="btn-danger remove-from-want-to-read"
            onButtonClick={() => handleRemoveAndAddToShelf(book.id)}
            // onWantToReadClick={() => {}} // No action needed for "Want to Read" button here
          />
        ))}
      </div>
    </section>
  );
};

export default WantToRead;