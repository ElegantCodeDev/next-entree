import mongoose from 'mongoose';

// user taine
// pw 2tVy6WJ37pJEHr2j

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    return console.log('Missing MONGODB_URI');
  }

  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'test'
    });

    isConnected = true;

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection error', error);
  }
};
