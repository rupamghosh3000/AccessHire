import express from 'express';
import { getApplicationPreview } from '../controllers/previewController.js';

const router = express.Router();

router.get('/jobs/:id/application-preview', getApplicationPreview);

export default router;
