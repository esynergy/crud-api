import express from 'express';
import documentRoutes from './routes/documentRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use(API_PREFIX, documentRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
    timestamp: new Date().toISOString()
  });
});

app.use(errorHandler);

export default app;
