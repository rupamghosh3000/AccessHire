import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { getJobs, getJobById, toggleSaveJob, getSavedJobs } from '../services/jobs/jobService.js';

export const listJobs = async (req, res, next) => {
  try {
    const jobs = await getJobs(req.query);
    return sendSuccess(res, { jobs, count: jobs.length });
  } catch (err) {
    next(err);
  }
};

export const getJob = async (req, res, next) => {
  try {
    const job = await getJobById(req.params.id);
    if (!job) {
      return sendError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }
    return sendSuccess(res, job);
  } catch (err) {
    next(err);
  }
};

export const saveJob = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const result = await toggleSaveJob(userId, req.params.id);
    return sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
};

export const unsaveJob = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const result = await toggleSaveJob(userId, req.params.id);
    return sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
};

export const listSavedJobs = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const savedJobs = await getSavedJobs(userId);
    return sendSuccess(res, { savedJobs, count: savedJobs.length });
  } catch (err) {
    next(err);
  }
};
