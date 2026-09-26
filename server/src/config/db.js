import mongoose from 'mongoose';
import { config } from './env.js';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return true;

  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${config.mongodbUri}: ${error.message}`);
    console.warn(`[MongoDB Warning] AccessHire AI will operate with in-memory persistence fallback for seamless demo execution.`);
    return false;
  }
};

export const getIsConnected = () => isConnected;
