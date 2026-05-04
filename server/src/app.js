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

console.log('=== Server Config ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Process CWD:', process.cwd());
console.log('Project Root:', projectRoot);
console.log('Client Dist Path:', clientDistPath);

const fs = require('fs');
if (isProduction) {
  const distExists = fs.existsSync(clientDistPath);
  console.log('Client dist exists:', distExists);
  if (distExists) {
    const files = fs.readdirSync(clientDistPath);
    console.log('Files in dist:', files.slice(0, 5));
  }
}

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

// Debug endpoint - always available
app.get('/api/debug', (_req, res) => {
  res.json({
    env: process.env.NODE_ENV,
    cwd: process.cwd(),
    clientDistPath,
    exists: fs.existsSync(clientDistPath)
  });
});

if (isProduction) {
  app.use(express.static(clientDistPath, { index: 'index.html' }));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    const indexPath = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    return res.status(404).json({ error: 'index.html not found', path: indexPath });
  });
} else {
  app.get('/', (_req, res) => {
    res.json({ message: 'Loan Settlement API is running' });
  });
}

module.exports = app;