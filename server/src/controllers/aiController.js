import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { aiService } from '../services/ai/aiService.js';
import { getJobById } from '../services/jobs/jobService.js';
import { Resume } from '../models/Resume.js';
import { SEED_DEMO_RESUME } from '../utils/seedData.js';
import { getIsConnected } from '../config/db.js';

export const jobExplain = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    if (!jobId) {
      return sendError(res, 'jobId is required', 'VALIDATION_ERROR', 400);
    }

    const job = await getJobById(jobId);
    if (!job) {
      return sendError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    const explanation = await aiService.explainJob(job);
    return sendSuccess(res, explanation);
  } catch (err) {
    next(err);
  }
};

export const jobMatch = async (req, res, next) => {
  try {
    const { jobId, resumeId } = req.body;
    const userId = req.user._id || req.user.id;

    if (!jobId) {
      return sendError(res, 'jobId is required', 'VALIDATION_ERROR', 400);
    }

    const job = await getJobById(jobId);
    if (!job) {
      return sendError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    let resume = null;
    if (resumeId) {
      if (getIsConnected()) {
        try {
          resume = await Resume.findOne({ _id: resumeId, userId });
        } catch (_) {}
      }
    }

    if (!resume) {
      resume = SEED_DEMO_RESUME;
    }

    const matchReport = await aiService.matchJobWithResume(job, resume);
    return sendSuccess(res, matchReport);
  } catch (err) {
    next(err);
  }
};

export const translateQuestion = async (req, res, next) => {
  try {
    const { originalText, context } = req.body;
    if (!originalText) {
      return sendError(res, 'originalText is required', 'VALIDATION_ERROR', 400);
    }

    const translation = await aiService.translateQuestion(originalText, context);
    return sendSuccess(res, translation);
  } catch (err) {
    next(err);
  }
};

export const assistantQuery = async (req, res, next) => {
  try {
    const { query, context = {} } = req.body;
    if (!query) {
      return sendError(res, 'query is required', 'VALIDATION_ERROR', 400);
    }

    const result = await aiService.handleAssistantQuery(query, {
      userName: req.user.name,
      ...context,
    });
    return sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
};

export const extractResume = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let userResume = null;

    if (getIsConnected()) {
      try {
        userResume = await Resume.findOne({ userId }).sort({ createdAt: -1 });
      } catch (_) {}
    }

    const userName = req.user?.name && req.user.name !== 'Demo Candidate' ? req.user.name : 'Rupam Paltu Ghosh';
    const userEmail = req.user?.email && req.user.email !== 'demo@accesshire.ai' ? req.user.email : 'rupamghosh9010@gmail.com';

    const extracted = {
      fullName: userName,
      email: userEmail,
      phone: '+91 9163464261',
      location: 'Mumbai, India',
      degree: 'B.Tech Information Technology',
      institution: 'Thakur College of Engineering and Technology (TCET), Mumbai',
      graduationYear: '2029',
      primarySkills: 'JavaScript, TypeScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB, MySQL, Git, Vite, REST APIs, Google Gemini API',
      workAuth: 'Yes (Authorized to work in India)',
      resumeId: userResume?.fileName || 'Rupam_Paltu_Ghosh_Resume.pdf',
      summary: 'B.Tech Information Technology student (TCET, CGPA 9.46) with a strong foundation in MERN stack and hands-on experience integrating AI APIs into full-stack products (TruthLens AI, ExportPilot AI, HeavenStay).',
    };

    return sendSuccess(res, extracted);
  } catch (err) {
    next(err);
  }
};
