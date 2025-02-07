import React, { useContext, useEffect, useState } from 'react';
import { ShelfContext } from '../context/ShelfContext';
import { getBookRecommendations } from '../api/chatGPTAPI';

const Recs: React.FC = () => {
  const { shelf } = useContext(ShelfContext);
  const [recommendations, setRecommendations] = useState<string[]>([]);

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
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </section>
  );
};

export default Recs;