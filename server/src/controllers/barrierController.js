import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { getBarrierReportForJob, refreshBarrierReport } from '../services/barrier/barrierAnalysisService.js';
import { getJobById } from '../services/jobs/jobService.js';

export const getBarrierReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await getJobById(id);
    if (!job) {
      return sendError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    const report = await getBarrierReportForJob(id);
    return sendSuccess(res, report);
  } catch (err) {
    next(err);
  }
};

export const refreshReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await getJobById(id);
    if (!job) {
      return sendError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    const report = await refreshBarrierReport(id);
    return sendSuccess(res, report);
  } catch (err) {
    next(err);
  }
};
