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
      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors?.join(', ');

      const synopsisPrompt = `Provide a 3-sentence synopsis for the book titled "${title}" by ${authors} that would make someone want to read it.`;

      const synopsisResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: synopsisPrompt },
        ],
        max_tokens: 150,
      });

      const synopsis = synopsisResponse.choices[0]?.message?.content?.trim() || '';

      return {
        id: book.id,
        volumeInfo: {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          publishedDate: book.volumeInfo.publishedDate,
          description: synopsis, // Use the synopsis from ChatGPT
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