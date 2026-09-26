import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config/env.js';

const uploadDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `resume-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
  ];

  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.pdf', '.docx', '.doc', '.txt'];

  if (allowedTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only PDF, DOCX, and TXT files are supported.'), false);
  }
};

export const uploadResume = multer({
  storage,
  limits: {
    fileSize: config.uploadMaxMb * 1024 * 1024,
  },
  fileFilter,
});
