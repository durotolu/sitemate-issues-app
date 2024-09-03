// src/index.ts
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
