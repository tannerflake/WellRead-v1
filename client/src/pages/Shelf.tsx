import React, { useState, useEffect } from 'react';
// import { ShelfContext } from '../context/ShelfContext';
// import { WantToReadContext } from '../context/WantToReadContext';
import BookItem from '../components/BookItem';
import './Shelf.css'; // Import the CSS file
import auth from '../utils/auth';
import { retrieveUserById } from '../api/userAPI';
import { ShelvedBookInterface } from '../interfaces/ShelvedBookInterface';

const Shelf: React.FC = () => {
  // const { shelf, removeFromShelf } = useContext(ShelfContext);
  // const { wantToRead, removeFromWantToRead } = useContext(WantToReadContext);
  const [selectedTab, setSelectedTab] = useState<'shelf' | 'wantToRead'>('shelf');
  const [favoriteBooks, setFavoriteBooks] = useState<ShelvedBookInterface[]>([]);
  const [wantToReadBooks, setWantToReadBooks] = useState<ShelvedBookInterface[]>([]);

  //fetching user data to see what books are in the shelf
  useEffect(() => {
    const userId = auth.getProfile().id;
    retrieveUserById(userId as number).then((user) => {
      for(const shelvedBook of user.shelvedBooks){
        if(shelvedBook.isFavorite){
          setFavoriteBooks((prev) => [...prev, shelvedBook]);
        } else if(shelvedBook.isWantToRead){
          setWantToReadBooks((prev) => [...prev, shelvedBook]);
        }
      }
    });
  }, []);



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
            {favoriteBooks.map((book, index) => (
              <BookItem
                key={index}
                shelvedBook={book}
                buttonText="Remove"
                buttonClass="btn-danger
                remove-from-shelf"
                onButtonClick={() => {}}
              />
            ))}
          </>
        )}
        {selectedTab === 'wantToRead' &&
          wantToReadBooks.map((book, index) => (
            <BookItem
              key={index}
              shelvedBook={book}
              buttonText="Remove"
              buttonClass="btn-danger remove-from-wantToRead"
              onButtonClick={() => {}}
            />
          ))}
      </div>
    </section>
  );
};

export default Shelf;






