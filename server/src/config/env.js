import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from workspace root or server root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/accesshire_ai',
  jwtSecret: process.env.JWT_SECRET || 'accesshire_super_secret_jwt_key_2026_hackathon_ps003',
  cookieSecret: process.env.COOKIE_SECRET || 'accesshire_super_secret_cookie_key_2026',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  aiModel: process.env.AI_MODEL || 'gemini-1.5-flash',
  uploadMaxMb: parseInt(process.env.UPLOAD_MAX_MB || '10', 10),
};
