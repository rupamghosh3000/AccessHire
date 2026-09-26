import { Job } from '../../models/Job.js';
import { SavedJob } from '../../models/SavedJob.js';
import { SEED_JOBS } from '../../utils/seedData.js';
import { getIsConnected } from '../../config/db.js';

let inMemorySavedJobs = new Set();

export const getJobs = async (filters = {}) => {
  const { q, location, workMode, experience, skill } = filters;

  if (getIsConnected()) {
    try {
      const query = {};
      if (q) {
        query.$or = [
          { title: { $regex: q, $options: 'i' } },
          { company: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { requiredSkills: { $regex: q, $options: 'i' } },
        ];
      }
      if (location) {
        query.location = { $regex: location, $options: 'i' };
      }
      if (workMode && workMode !== 'all') {
        query.workMode = workMode;
      }
      if (experience) {
        query.experienceLevel = { $regex: experience, $options: 'i' };
      }
      if (skill) {
        query.requiredSkills = { $regex: skill, $options: 'i' };
      }

      const dbJobs = await Job.find(query).sort({ createdAt: -1 });
      if (dbJobs && dbJobs.length > 0) return dbJobs;
    } catch (_) {}
  }

  // Seed / In-memory fallback search logic
  return SEED_JOBS.filter((job) => {
    if (q) {
      const term = q.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(term);
      const matchesCompany = job.company.toLowerCase().includes(term);
      const matchesDesc = job.description.toLowerCase().includes(term);
      const matchesSkill = job.requiredSkills.some((s) => s.toLowerCase().includes(term));
      if (!matchesTitle && !matchesCompany && !matchesDesc && !matchesSkill) return false;
    }
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    if (workMode && workMode !== 'all' && job.workMode !== workMode) {
      return false;
    }
    if (skill && !job.requiredSkills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))) {
      return false;
    }
    return true;
  });
};

export const getJobById = async (id) => {
  if (getIsConnected()) {
    try {
      const dbJob = await Job.findById(id);
      if (dbJob) return dbJob;
    } catch (_) {}
  }

  const seedJob = SEED_JOBS.find((j) => j._id === id || j._id.toString() === id.toString());
  if (seedJob) {
    return { ...seedJob, id: seedJob._id };
  }
  return null;
};

export const toggleSaveJob = async (userId, jobId) => {
  if (getIsConnected()) {
    try {
      const existing = await SavedJob.findOne({ userId, jobId });
      if (existing) {
        await SavedJob.deleteOne({ _id: existing._id });
        return { isSaved: false };
      } else {
        await SavedJob.create({ userId, jobId });
        return { isSaved: true };
      }
    } catch (_) {}
  }

  const key = `${userId}:${jobId}`;
  if (inMemorySavedJobs.has(key)) {
    inMemorySavedJobs.delete(key);
    return { isSaved: false };
  } else {
    inMemorySavedJobs.add(key);
    return { isSaved: true };
  }
};

export const getSavedJobs = async (userId) => {
  if (getIsConnected()) {
    try {
      const saved = await SavedJob.find({ userId }).populate('jobId');
      return saved.map((s) => s.jobId).filter(Boolean);
    } catch (_) {}
  }

  const result = [];
  for (const key of inMemorySavedJobs) {
    const [uId, jId] = key.split(':');
    if (uId === userId.toString()) {
      const job = await getJobById(jId);
      if (job) result.push(job);
    }
  }
  return result;
};
