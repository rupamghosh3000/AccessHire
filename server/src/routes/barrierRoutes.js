import express from 'express';
import { getBarrierReport, refreshReport } from '../controllers/barrierController.js';

const router = express.Router();

router.get('/jobs/:id/barrier-report', getBarrierReport);
router.post('/jobs/:id/barrier-report/refresh', refreshReport);

export default router;
