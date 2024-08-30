import 'dotenv/config';
export const env = {
  PORT: parseInt(process.env.PORT || '3000'),
  GEMINI: {
    KEY: process.env.GEMINI_API_KEY || '',
    GEMINI: process.env.GEMINI || 'gemini-1.5-flash',
  },
};
