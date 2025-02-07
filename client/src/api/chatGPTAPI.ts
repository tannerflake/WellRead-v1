import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getBookRecommendations = async (bookshelf: string[]) => {
  const prompt = `Based on the following books, recommend 5 books: ${bookshelf.join(', ')}`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 150,
  });

  return response.data.choices[0].text.trim().split('\n');
};