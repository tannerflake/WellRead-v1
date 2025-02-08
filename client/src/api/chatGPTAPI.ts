import OpenAI from 'openai';
import axios from 'axios';
import { Book } from '../interfaces/Book';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getBookRecommendations = async (bookshelf: string[]): Promise<Book | null> => {
  const prompt = `Based on the following books, recommend a book: ${bookshelf.join(', ')}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
    });

    const recommendation = response.choices[0]?.message?.content?.trim().split('\n')[0] || '';
    console.log('Recommendation from OpenAI:', recommendation);

    const googleBooksResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: recommendation,
        maxResults: 1,
      },
    });
    console.log('Google Books API response:', googleBooksResponse.data);
    const book = googleBooksResponse.data.items[0];
    if (book) {
      return {
        id: book.id,
        volumeInfo: {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          publishedDate: book.volumeInfo.publishedDate,
          description: book.volumeInfo.description,
          imageLinks: book.volumeInfo.imageLinks,
        },
      };
    }

    return null;
  } catch (error) {
    console.error('Error from OpenAI or Google Books:', error);
    return null;
  }
};