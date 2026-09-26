import express from 'express';
import { uploadResume, listResumes, getResume, deleteResume } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadResume as uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/resumes', protect, uploadMiddleware.single('file'), uploadResume);
router.get('/resumes', protect, listResumes);
router.get('/resumes/:id', protect, getResume);
router.delete('/resumes/:id', protect, deleteResume);

export default router;
