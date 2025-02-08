import OpenAI from 'openai';
import axios from 'axios';
import { Book } from '../interfaces/Book';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getBookRecommendations = async (bookshelf: string[]): Promise<Book[]> => {
  const prompt = `Based on the following books, recommend 5 books: ${bookshelf.join(', ')}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
    });

    const recommendations = response.choices[0]?.message?.content?.trim().split('\n') || [];
    console.log('Recommendations from OpenAI:', recommendations);

    const validRecommendations = recommendations
      .map(rec => rec.replace(/^\d+\.\s*/, '').trim()) // Remove numbering and trim
      .filter(rec => rec && !rec.startsWith('Based on the information provided'));

    const books: Book[] = [];
    for (const title of validRecommendations) {
      console.log('Searching for book title:', title);
      const googleBooksResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: title,
          maxResults: 1,
        },
      });
      console.log('Google Books API response:', googleBooksResponse.data);
      const book = googleBooksResponse.data.items[0];
      if (book) {
        books.push({
          id: book.id,
          volumeInfo: {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            imageLinks: book.volumeInfo.imageLinks,
          },
        });
      }
    }

    return books;
  } catch (error) {
    console.error('Error from OpenAI or Google Books:', error);
    return [];
  }
};