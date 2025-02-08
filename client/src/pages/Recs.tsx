import React, { useContext, useEffect, useState } from 'react';
import { ShelfContext } from '../context/ShelfContext';
import { getBookRecommendations } from '../api/chatGPTAPI';
import SearchBookItem from '../components/SearchBookItem';
import { Book } from '../interfaces/Book';

const Recs: React.FC = () => {
  const { shelf } = useContext(ShelfContext);
  const [recommendations, setRecommendations] = useState<Book[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (shelf && shelf.length > 0) {
        const bookTitles = shelf.map(book => book.volumeInfo.title);
        const recs = await getBookRecommendations(bookTitles);
        setRecommendations(recs);
      }
    };

    fetchRecommendations();
  }, [shelf]);

  return (
    <section>
      <h1>Recommendations</h1>
      <div className="search-results">
        {recommendations.map((book) => (
          <SearchBookItem
            key={book.id}
            book={book}
            onAddToShelfClick={() => {}}
            onWantToReadClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default Recs;