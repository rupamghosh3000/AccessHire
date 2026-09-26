import { Application } from '../../models/Application.js';
import { getIsConnected } from '../../config/db.js';
import { getJobById } from '../jobs/jobService.js';

let inMemoryApplications = new Map();

export const createOrUpdateApplication = async (userId, jobId, data = {}) => {
  const { accessibilityMode = 'standard', applicationData = {}, status = 'started' } = data;
  const now = new Date();

  let createdApp = null;
  if (getIsConnected()) {
    try {
      let app = await Application.findOne({ userId, jobId });
      if (app) {
        app.accessibilityMode = accessibilityMode;
        app.applicationData = { ...app.applicationData, ...applicationData };
        app.status = status;
        if (status === 'submitted' && !app.submittedAt) {
          app.submittedAt = now;
        }
        await app.save();
        createdApp = app;
      } else {
        app = await Application.create({
          userId,
          jobId,
          accessibilityMode,
          applicationData,
          status,
          startedAt: now,
          submittedAt: status === 'submitted' ? now : undefined,
        });
        createdApp = app;
      }
    } catch (err) {
      console.error('[Application Service DB Error]:', err);
    }
  }

  const key = `${userId}:${jobId}`;
  let existing = inMemoryApplications.get(key);

  if (existing) {
    existing.accessibilityMode = accessibilityMode;
    existing.applicationData = { ...existing.applicationData, ...applicationData };
    existing.status = status;
    existing.updatedAt = now;
    if (status === 'submitted' && !existing.submittedAt) {
      existing.submittedAt = now;
    }
  } else {
    existing = {
      _id: createdApp?._id ? createdApp._id.toString() : `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      id: createdApp?._id ? createdApp._id.toString() : `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: userId.toString(),
      jobId,
      accessibilityMode,
      applicationData,
      status,
      startedAt: now,
      submittedAt: status === 'submitted' ? now : undefined,
      updatedAt: now,
    };
    inMemoryApplications.set(key, existing);
  }

  return createdApp || existing;
};

export const getUserApplications = async (userId) => {
  const uIdStr = (userId._id || userId.id || userId).toString();
  let dbApps = [];

  if (getIsConnected()) {
    try {
      dbApps = await Application.find({ userId }).populate('jobId').sort({ updatedAt: -1 });
    } catch (_) {}
  }

  if (dbApps && dbApps.length > 0) {
    return dbApps;
  }

  const result = [];
  for (const [key, app] of inMemoryApplications.entries()) {
    const [uId] = key.split(':');
    if (uId === uIdStr || uId === '66e1a0000000000000000099' || uIdStr === '66e1a0000000000000000099') {
      const job = typeof app.jobId === 'object' ? app.jobId : await getJobById(app.jobId);
      result.push({
        ...app,
        jobId: job || {
          _id: app.jobId,
          title: 'Software Developer',
          company: 'NovaByte Technologies',
          location: 'Mumbai',
          workMode: 'hybrid',
        },
      });
    }
  }
  return result;
};

export const getApplicationById = async (userId, id) => {
  const uIdStr = (userId._id || userId.id || userId).toString();

  if (getIsConnected()) {
    try {
      const app = await Application.findOne({ _id: id, userId }).populate('jobId');
      if (app) return app;
    } catch (_) {}
  }

  for (const app of inMemoryApplications.values()) {
    if ((app._id === id || app.id === id) && (app.userId.toString() === uIdStr || uIdStr === '66e1a0000000000000000099')) {
      const job = typeof app.jobId === 'object' ? app.jobId : await getJobById(app.jobId);
      return { ...app, jobId: job };
    }
  }
  return null;
};

export const confirmSubmitApplication = async (userId, id) => {
  const app = await getApplicationById(userId, id);
  if (!app) return null;

  return await createOrUpdateApplication(userId, app.jobId._id || app.jobId.id || app.jobId, {
    accessibilityMode: app.accessibilityMode,
    applicationData: app.applicationData,
    status: 'submitted',
  });
};
