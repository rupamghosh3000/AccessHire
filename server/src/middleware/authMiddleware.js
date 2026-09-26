import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { sendError } from '../utils/responseHandler.js';
import { User } from '../models/User.js';
import { SEED_DEMO_USER } from '../utils/seedData.js';

export const protect = async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Not authorized, token missing', 'UNAUTHORIZED', 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Check MongoDB first if connected, otherwise fallback to decoded session payload
    try {
      const user = await User.findById(decoded.id).select('-passwordHash');
      if (user) {
        req.user = user;
        return next();
      }
    } catch (_) {}

    // In-memory demo fallback user
    if (decoded.id === SEED_DEMO_USER._id || decoded.email === SEED_DEMO_USER.email) {
      req.user = {
        _id: SEED_DEMO_USER._id,
        id: SEED_DEMO_USER._id,
        name: decoded.name || SEED_DEMO_USER.name,
        email: SEED_DEMO_USER.email,
      };
      return next();
    }

    req.user = { id: decoded.id, name: decoded.name, email: decoded.email };
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 'UNAUTHORIZED', 401);
  }
};
