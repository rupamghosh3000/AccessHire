import express from 'express';
import { listJobs, getJob, saveJob, unsaveJob, listSavedJobs } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/jobs', listJobs);
router.get('/jobs/saved', protect, listSavedJobs);
router.get('/jobs/:id', getJob);
router.post('/jobs/:id/save', protect, saveJob);
router.delete('/jobs/:id/save', protect, unsaveJob);

export default router;
