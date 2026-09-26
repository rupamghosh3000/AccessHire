import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { registerSchema, loginSchema } from '../validators/authValidators.js';

const router = express.Router();

router.post('/auth/register', validate(registerSchema), register);
router.post('/register', validate(registerSchema), register);

router.post('/auth/login', validate(loginSchema), login);
router.post('/login', validate(loginSchema), login);

router.post('/auth/logout', logout);
router.post('/logout', logout);

router.get('/auth/me', protect, getCurrentUser);
router.get('/me', protect, getCurrentUser);

export default router;
