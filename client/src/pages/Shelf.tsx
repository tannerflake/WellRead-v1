import React, { useContext } from 'react';
import { ShelfContext } from '../context/ShelfContext';
import BookItem from '../components/BookItem';
import '../index.css'; // Import the CSS file

const Shelf: React.FC = () => {
  const { shelf, removeFromShelf } = useContext(ShelfContext);

  return (
    <section className="search-container">
      <h1>Shelf</h1>
      <div className="search-results">
        {shelf.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            buttonText="Remove"
            buttonClass="btn-danger remove-from-shelf"
            onButtonClick={() => removeFromShelf(book.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Shelf;