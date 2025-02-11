import React, { useContext, useState } from 'react';
import { ShelfContext } from '../context/ShelfContext';
import { WantToReadContext } from '../context/WantToReadContext';
import BookItem from '../components/BookItem';
import './Shelf.css'; // Import the CSS file

const Shelf: React.FC = () => {
  const { shelf, removeFromShelf } = useContext(ShelfContext);
  const { wantToRead, removeFromWantToRead } = useContext(WantToReadContext);
  const [selectedTab, setSelectedTab] = useState<'shelf' | 'wantToRead'>('shelf');


  return (
    <section className="shelf-container">
      <div className="tabs">
        <div
          className={`tab ${selectedTab === 'shelf' ? 'active' : ''}`}
          onClick={() => setSelectedTab('shelf')}
        >
          Favorite Books
        </div>
        <div
          className={`tab ${selectedTab === 'wantToRead' ? 'active' : ''}`}
          onClick={() => setSelectedTab('wantToRead')}
        >
          Want to Read
        </div>
      </div>
      <div className="search-results">
        {selectedTab === 'shelf' && (
          <>
            <p className="recommendation-note">We'll recommend you more books like these:</p>
            {shelf.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                buttonText="Remove"
                buttonClass="btn-danger remove-from-shelf"
                onButtonClick={() => removeFromShelf(book.id)}
              />
            ))}
          </>
        )}
        {selectedTab === 'wantToRead' &&
          wantToRead.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              buttonText="Remove"
              buttonClass="btn-danger remove-from-wantToRead"
              onButtonClick={() => removeFromWantToRead(book.id)}
            />
          ))}
      </div>
    </section>
  );
};

export default Shelf;