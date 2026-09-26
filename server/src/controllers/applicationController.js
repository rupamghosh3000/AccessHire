import { sendSuccess, sendError } from '../utils/responseHandler.js';
import {
  createOrUpdateApplication,
  getUserApplications,
  getApplicationById,
  confirmSubmitApplication,
} from '../services/application/applicationService.js';

export const createApplication = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { jobId, accessibilityMode, applicationData } = req.body;

    const application = await createOrUpdateApplication(userId, jobId, {
      accessibilityMode,
      applicationData,
      status: 'started',
    });

    return sendSuccess(res, application, 201);
  } catch (err) {
    next(err);
  }
};

export const listApplications = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const applications = await getUserApplications(userId);
    return sendSuccess(res, { applications, count: applications.length });
  } catch (err) {
    next(err);
  }
};

export const getApplication = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { id } = req.params;

    const application = await getApplicationById(userId, id);
    if (!application) {
      return sendError(res, 'Application not found', 'APPLICATION_NOT_FOUND', 404);
    }

    return sendSuccess(res, application);
  } catch (err) {
    next(err);
  }
};

export const updateApplication = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { id } = req.params;
    const { status, accessibilityMode, applicationData } = req.body;

    const existing = await getApplicationById(userId, id);
    if (!existing) {
      return sendError(res, 'Application not found', 'APPLICATION_NOT_FOUND', 404);
    }

    const updated = await createOrUpdateApplication(
      userId,
      existing.jobId._id || existing.jobId.id || existing.jobId,
      {
        status: status || existing.status,
        accessibilityMode: accessibilityMode || existing.accessibilityMode,
        applicationData: applicationData || existing.applicationData,
      }
    );

    return sendSuccess(res, updated);
  } catch (err) {
    next(err);
  }
};

export const confirmSubmit = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { id } = req.params;

    const submitted = await confirmSubmitApplication(userId, id);
    if (!submitted) {
      return sendError(res, 'Application not found or already processed', 'APPLICATION_NOT_FOUND', 404);
    }

    return sendSuccess(res, submitted);
  } catch (err) {
    next(err);
  }
};
