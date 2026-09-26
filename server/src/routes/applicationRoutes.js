import express from 'express';
import {
  createApplication,
  listApplications,
  getApplication,
  updateApplication,
  confirmSubmit,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/applications', protect, createApplication);
router.get('/applications', protect, listApplications);
router.get('/applications/:id', protect, getApplication);
router.patch('/applications/:id', protect, updateApplication);
router.post('/applications/:id/confirm-submit', protect, confirmSubmit);

export default router;
