// import { Router, Request, Response } from 'express';
// import OpenAI from 'openai';

// const router = Router();

// const openai = new OpenAI({
//   apiKey: process.env.VITE_OPENAI_API_KEY!,
// });

// router.post('/', async (req: Request, res: Response) => {
//   const { bookshelf } = req.body;

//   const prompt = `Based on the following books, recommend 5 books: ${bookshelf.join(', ')}`;

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' },
//         { role: 'user', content: prompt },
//       ],
//       max_tokens: 150,
//     });

//     const recommendations = response.choices[0]?.message?.content?.trim().split('\n') || [];
//     res.json({ recommendations });
//   } catch (error) {
//     console.error('Error from OpenAI:', error);
//     res.status(500).json({ error: 'Failed to get recommendations' });
//   }
// });

// export default router;