import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { Resume } from '../models/Resume.js';
import { parseResumeFile } from '../services/resume/resumeParser.js';
import { getIsConnected } from '../config/db.js';
import { SEED_DEMO_RESUME } from '../utils/seedData.js';

let inMemoryResumes = new Map();

export const uploadResume = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const file = req.file;

    if (!file) {
      // If no file uploaded directly, attach seed/demo resume payload
      const demoData = {
        _id: `res_${Date.now()}`,
        id: `res_${Date.now()}`,
        userId,
        fileName: SEED_DEMO_RESUME.fileName,
        fileType: SEED_DEMO_RESUME.fileType,
        fileUrl: SEED_DEMO_RESUME.fileUrl,
        extractedText: SEED_DEMO_RESUME.extractedText,
        skills: SEED_DEMO_RESUME.skills,
        education: SEED_DEMO_RESUME.education,
        experience: SEED_DEMO_RESUME.experience,
        createdAt: new Date(),
      };

      if (getIsConnected()) {
        try {
          const doc = await Resume.create(demoData);
          return sendSuccess(res, doc, 201);
        } catch (_) {}
      }

      inMemoryResumes.set(demoData.id, demoData);
      return sendSuccess(res, demoData, 201);
    }

    const parsedData = await parseResumeFile(file);

    const resumeRecord = {
      userId,
      fileName: file.originalname,
      fileType: file.mimetype,
      fileUrl: `/uploads/${file.filename}`,
      extractedText: parsedData.extractedText,
      skills: parsedData.skills,
      education: parsedData.education,
      experience: parsedData.experience,
    };

    if (getIsConnected()) {
      const doc = await Resume.create(resumeRecord);
      return sendSuccess(res, doc, 201);
    }

    const id = `res_${Date.now()}`;
    const inMemDoc = { id, _id: id, ...resumeRecord, createdAt: new Date() };
    inMemoryResumes.set(id, inMemDoc);
    return sendSuccess(res, inMemDoc, 201);
  } catch (err) {
    next(err);
  }
};

export const listResumes = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getIsConnected()) {
      const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
      if (resumes && resumes.length > 0) return sendSuccess(res, resumes);
    }

    const userResumes = Array.from(inMemoryResumes.values()).filter(
      (r) => r.userId.toString() === userId.toString()
    );

    if (userResumes.length === 0) {
      // Include fallback demo resume
      userResumes.push({ ...SEED_DEMO_RESUME, userId, id: SEED_DEMO_RESUME._id });
    }

    return sendSuccess(res, userResumes);
  } catch (err) {
    next(err);
  }
};

export const getResume = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { id } = req.params;

    if (getIsConnected()) {
      const doc = await Resume.findOne({ _id: id, userId });
      if (doc) return sendSuccess(res, doc);
    }

    const inMem = inMemoryResumes.get(id);
    if (inMem && inMem.userId.toString() === userId.toString()) {
      return sendSuccess(res, inMem);
    }

    if (id === SEED_DEMO_RESUME._id) {
      return sendSuccess(res, { ...SEED_DEMO_RESUME, userId, id: SEED_DEMO_RESUME._id });
    }

    return sendError(res, 'Resume not found', 'RESUME_NOT_FOUND', 404);
  } catch (err) {
    next(err);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { id } = req.params;

    if (getIsConnected()) {
      await Resume.deleteOne({ _id: id, userId });
    }

    inMemoryResumes.delete(id);
    return sendSuccess(res, { message: 'Resume deleted successfully' });
  } catch (err) {
    next(err);
  }
};
