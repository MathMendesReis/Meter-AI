import 'dotenv/config';
export const env = {
  PORT: parseInt(process.env.PORT || '3000'),
  GEMINI: {
    KEY: process.env.GEMINI_API_KEY || '',
    GEMINI: process.env.GEMINI || 'gemini-1.5-flash',
  },
  SUPABASE: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  },
};
