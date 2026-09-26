import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
import { config } from './config/env.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import accessibilityRoutes from './routes/accessibilityRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import barrierRoutes from './routes/barrierRoutes.js';
import previewRoutes from './routes/previewRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

const app = express();

// Security and utility middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(config.cookieSecret));

// Static files for uploaded resumes
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      service: 'AccessHire AI Backend API',
      timestamp: new Date().toISOString(),
    },
  });
});

// API Routes
const apiPrefix = '/api/v1';
app.use(apiPrefix, authRoutes);
app.use(apiPrefix, accessibilityRoutes);
app.use(apiPrefix, jobRoutes);
app.use(apiPrefix, resumeRoutes);
app.use(apiPrefix, aiRoutes);
app.use(apiPrefix, barrierRoutes);
app.use(apiPrefix, previewRoutes);
// Serve static client SPA build in production
if (config.nodeEnv === 'production') {
  const clientBuildPath = path.resolve(process.cwd(), 'client/dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
}

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
