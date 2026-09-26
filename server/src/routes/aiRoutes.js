import express from 'express';
import { jobExplain, jobMatch, translateQuestion, assistantQuery, extractResume } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Support both /ai/* and /* paths for flexible frontend calls
router.post('/ai/job-explain', protect, jobExplain);
router.post('/job-explain', protect, jobExplain);

router.post('/ai/job-match', protect, jobMatch);
router.post('/job-match', protect, jobMatch);

router.post('/ai/translate', protect, translateQuestion);
router.post('/translate', protect, translateQuestion);

router.post('/ai/assistant', protect, assistantQuery);
router.post('/assistant', protect, assistantQuery);

router.post('/ai/extract-resume', protect, extractResume);
router.post('/extract-resume', protect, extractResume);

export default router;
