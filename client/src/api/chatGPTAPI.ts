import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getBookRecommendations = async (bookshelf: string[]): Promise<string[]> => {
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
    return recommendations;
  } catch (error) {
    console.error('Error from OpenAI:', error);
    return [];
  }
};