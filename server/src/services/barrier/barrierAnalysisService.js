import { BarrierReport } from '../../models/BarrierReport.js';
import { SEED_BARRIER_REPORTS } from '../../utils/seedData.js';
import { getIsConnected } from '../../config/db.js';
import { getJobById } from '../jobs/jobService.js';

export const getBarrierReportForJob = async (jobId) => {
  if (getIsConnected()) {
    try {
      const existing = await BarrierReport.findOne({ jobId });
      if (existing) return existing;
    } catch (_) {}
  }

  const seedReport = SEED_BARRIER_REPORTS[jobId.toString()];
  if (seedReport) {
    return {
      id: `report_${jobId}`,
      jobId,
      ...seedReport,
    };
  }

  const job = await getJobById(jobId);
  const isHybridOrOnsite = job?.workMode !== 'remote';

  return {
    id: `report_${jobId}`,
    jobId,
    voiceSupport: 'supported',
    keyboardSupport: 'supported',
    screenReaderSupport: 'supported',
    formComplexity: isHybridOrOnsite ? 'medium' : 'low',
    externalDependencies: [job?.company ? `${job.company} Direct Portal` : 'Employer Portal'],
    detectedBarriers: [
      {
        type: 'file_upload_format',
        description: 'File upload field requires PDF or DOCX attachment within size limit.',
        severity: 'medium',
      },
      {
        type: 'multi_step_form',
        description: '4-step application preview sequence requires sequential step completion.',
        severity: 'low',
      }
    ],
    suggestedWorkarounds: [
      {
        barrierType: 'file_upload_format',
        workaround: 'AccessHire AI automatically attaches your verified active resume from your Passport.',
      },
      {
        barrierType: 'multi_step_form',
        workaround: 'Use Adaptive Apply simplified mode or voice-assisted navigation.',
      }
    ],
    confidence: 0.88,
  };
};

export const refreshBarrierReport = async (jobId) => {
  // Simulates a re-analysis or live verification scan
  return await getBarrierReportForJob(jobId);
};
