import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { env } from 'src/infra/env/env';

export const genAI = new GoogleGenerativeAI(env.GEMINI.KEY);
export const fileManager = new GoogleAIFileManager(env.GEMINI.KEY);
export const model = genAI.getGenerativeModel({ model: env.GEMINI.GEMINI });
