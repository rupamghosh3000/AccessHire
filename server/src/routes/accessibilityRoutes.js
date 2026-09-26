import express from 'express';
import { getProfile, updateProfile } from '../controllers/accessibilityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { accessibilityProfileSchema } from '../validators/accessibilityValidators.js';

const router = express.Router();

router.get('/accessibility-profile', protect, getProfile);
router.put('/accessibility-profile', protect, validate(accessibilityProfileSchema), updateProfile);

export default router;
