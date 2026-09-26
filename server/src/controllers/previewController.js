import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { ApplicationPreview } from '../models/ApplicationPreview.js';
import { getJobById } from '../services/jobs/jobService.js';
import { getIsConnected } from '../config/db.js';

export const getApplicationPreview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await getJobById(id);
    if (!job) {
      return sendError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    if (getIsConnected()) {
      try {
        const dbPreview = await ApplicationPreview.findOne({ jobId: id });
        if (dbPreview) return sendSuccess(res, dbPreview);
      } catch (_) {}
    }

    // Default simulation preview response
    const defaultPreview = {
      jobId: id,
      steps: [
        {
          stepNumber: 1,
          title: 'Personal Information',
          description: 'Provide your basic contact information and primary phone number.',
          fields: [
            { name: 'fullName', label: 'Full Name', type: 'text', required: true, explanation: 'Your official full name for application records.' },
            { name: 'email', label: 'Email Address', type: 'email', required: true, explanation: 'Primary email address for interview invitations.' },
            { name: 'phone', label: 'Contact Phone', type: 'tel', required: true, explanation: 'Primary contact telephone number.' },
            { name: 'location', label: 'City / Location', type: 'text', required: true, explanation: 'Your current location of residence.' }
          ]
        },
        {
          stepNumber: 2,
          title: 'Education & Qualifications',
          description: 'Specify your academic background and highest degree.',
          fields: [
            { name: 'degree', label: 'Degree Name', type: 'text', required: true, explanation: 'e.g., B.E. Information Technology' },
            { name: 'institution', label: 'University / College', type: 'text', required: true, explanation: 'Educational institution attended.' },
            { name: 'graduationYear', label: 'Graduation Year', type: 'text', required: true, explanation: 'Year of completion.' }
          ]
        },
        {
          stepNumber: 3,
          title: 'Technical Skills & Work Authorization',
          description: 'Select your key skills and verify legal work eligibility.',
          fields: [
            { name: 'primarySkills', label: 'Primary Technical Skills', type: 'text', required: true, explanation: 'Core technical competencies (e.g. Java, SQL, REST APIs).' },
            { name: 'workAuth', label: 'Are you legally authorized to work in the jurisdiction associated with this position?', type: 'select', required: true, explanation: 'Do you currently have legal permission to work where this job is located?', potentialBarrier: 'Contains formal legal wording.' }
          ]
        },
        {
          stepNumber: 4,
          title: 'Resume Attachment',
          description: 'Attach or confirm your active verified resume.',
          fields: [
            { name: 'resumeId', label: 'Attached Resume', type: 'file', required: true, explanation: 'Active verified resume stored in AccessHire Passport.' }
          ]
        },
        {
          stepNumber: 5,
          title: 'Review & Confirm',
          description: 'Carefully review all application entries before final submission.',
          fields: []
        }
      ],
      complexityScore: 2,
      detectedBarriers: [
        { barrier: 'Complex legal work authorization phrasing', workaround: 'Use Application Translator to read plain-language explanation.' }
      ]
    };

    return sendSuccess(res, defaultPreview);
  } catch (err) {
    next(err);
  }
};
