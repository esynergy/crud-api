import 'dotenv/config.js';
import http from 'http';
import app from './app.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`\n🚀 Document Management API Server`);
  console.log(`   Environment: ${NODE_ENV}`);
  console.log(`   Running on: http://localhost:${PORT}`);
  console.log(`   API Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`\n📚 Available Endpoints:`);
  console.log(`   GET    /api/v1/documents         - List all documents`);
  console.log(`   GET    /api/v1/document/:id      - Get specific document`);
  console.log(`   POST   /api/v1/documents/create  - Create new document`);
  console.log(`   PUT    /api/v1/documents/:id     - Update document`);
  console.log(`   DELETE /api/v1/documents/:id     - Delete document\n`);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') throw error;
  
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
