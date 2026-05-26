import dns from 'node:dns/promises';
dns.setServers(['8.8.8.8', '8.8.4.4']); 
import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB database successfully');
    app.listen(PORT, () => {
      console.log(`Server running smoothly on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

