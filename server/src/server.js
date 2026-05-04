require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/db');

const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || 'development';

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port} (${environment})`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });