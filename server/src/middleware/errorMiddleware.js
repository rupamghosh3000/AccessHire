import { sendError } from '../utils/responseHandler.js';

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error Middleware] ${req.method} ${req.originalUrl}:`, err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'An unexpected error occurred on the server.';
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  return sendError(res, message, code, statusCode, process.env.NODE_ENV === 'development' ? { stack: err.stack } : {});
};

export const notFound = (req, res, next) => {
  return sendError(res, `Route not found: ${req.originalUrl}`, 'NOT_FOUND', 404);
};
