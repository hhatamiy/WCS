// backend/db.js
import mongoose from 'mongoose';

export default async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set - running without MongoDB cache');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    // MongoDB is only used as a cache, so keep serving requests without it
    console.error('MongoDB connection failed - running without cache:', err.message);
  }
}
