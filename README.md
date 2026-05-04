# Loan Settlement

A clean MERN stack starter for a loan settlement app with a React frontend, Express backend, MongoDB-ready server setup, and Tailwind CSS styling.

## Structure

- `client` - React app built with Vite and Tailwind CSS
- `server` - Express API with MongoDB connection helper

## Requirements

- Node.js 18+
- Bun
- MongoDB connection string for database features

## Setup

1. Install dependencies from the project root with Bun:

   ```bash
   bun install
   ```

2. Create or edit the `.env` file inside `server`:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   LEAD_TO_EMAIL=credirelief@gmail.com
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   SMTP_FROM=Loan Settlement <your_verified_sender@example.com>
   ```

3. Start both apps in development mode:

   ```bash
   bun run dev
   ```

## Scripts

- `bun run dev` - runs the server and client together
- `bun run build` - builds the client for production
- `bun run start` - starts the server

## Production Deploy

1. Install dependencies:

   ```bash
   bun install
   ```

2. Build frontend assets:

   ```bash
   bun run build
   ```

3. Set environment in `server/.env`:

   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_ORIGIN=https://your-domain.com
   LEAD_TO_EMAIL=credirelief@gmail.com
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   SMTP_FROM=Loan Settlement <your_verified_sender@example.com>
   ```

4. Start server:

   ```bash
   bun run start
   ```

In production mode, the Express server serves `client/dist` automatically and keeps API routes under `/api/*`.

## Notes

- The server starts even if `MONGODB_URI` is missing, which makes the starter easy to run before database setup.
- If SMTP variables are missing, lead data is logged in server console and mail is skipped.
- The frontend includes a polished Tailwind landing page so you can extend it into a dashboard, CRUD app, or auth flow.
