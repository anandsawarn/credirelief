const express = require('express');
const cors = require('cors');
const path = require('path');

const healthRoute = require('./routes/health');
const leadsRoute = require('./routes/leads');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const clientDistPath = path.resolve(__dirname, '../../client/dist');
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