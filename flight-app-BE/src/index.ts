import express, { Request, Response } from 'express';

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Flight Booking API Server is running!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});
