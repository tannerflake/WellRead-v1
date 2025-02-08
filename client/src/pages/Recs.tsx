import React, { useContext, useEffect, useState } from 'react';
import { ShelfContext } from '../context/ShelfContext';
import { WantToReadContext } from '../context/WantToReadContext';
import { getBookRecommendations } from '../api/chatGPTAPI';
import RecommendedBookItem from '../components/RecommendedBookItem';
import { Book } from '../interfaces/Book';

const Recs: React.FC = () => {
  const { shelf, addToShelf } = useContext(ShelfContext);
  const { addToWantToRead } = useContext(WantToReadContext);
  const [recommendation, setRecommendation] = useState<Book | null>(null);

  const fetchRecommendation = async () => {
    const bookTitles = shelf.map((book: Book) => book.volumeInfo.title);
    const rec = await getBookRecommendations(bookTitles);
    setRecommendation(rec);
  };

  useEffect(() => {
    fetchRecommendation();
  }, [shelf]);

  const handleAddToShelf = () => {
    if (recommendation) {
      addToShelf(recommendation);
      fetchRecommendation();
    }
  };

  const handleWantToRead = () => {
    if (recommendation) {
      addToWantToRead(recommendation);
      fetchRecommendation();
    }
  };

  const handleDismiss = () => {
    fetchRecommendation();
  };

  return (
    <section>
      <h1>Recommendations</h1>
      <div className="recommendation-container">
        {recommendation && (
          <RecommendedBookItem
            book={recommendation}
            onAddToShelfClick={handleAddToShelf}
            onWantToReadClick={handleWantToRead}
            onDismissClick={handleDismiss}
          />
        )}
      </div>
    </section>
  );
};

export default Recs;