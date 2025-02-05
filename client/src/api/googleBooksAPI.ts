import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

const searchBooks = async (query: string) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query,
        maxResults: 10,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export { searchBooks };