const mongoose = require('mongoose');

async function connectDatabase() {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    console.warn('MONGODB_URI is not set. Starting server without a database connection.');
    return;
  }

  await mongoose.connect(connectionString);
  console.log('MongoDB connected');
}

module.exports = connectDatabase;