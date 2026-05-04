const express = require('express');
const cors = require('cors');
const path = require('path');

const healthRoute = require('./routes/health');
const leadsRoute = require('./routes/leads');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
// Resolve client dist path - works from both local and production environments
const projectRoot = process.cwd().includes('server') 
  ? path.resolve(__dirname, '../..') 
  : process.cwd();
const clientDistPath = path.join(projectRoot, 'client', 'dist');
const configuredOrigin = process.env.CLIENT_ORIGIN;

const corsOptions = {
  origin: configuredOrigin ? configuredOrigin.split(',').map((origin) => origin.trim()) : true,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoute);
app.use('/api/leads', leadsRoute);

if (isProduction) {
  app.use(express.static(clientDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    return res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.json({ message: 'Loan Settlement API is running' });
  });
}

module.exports = app;