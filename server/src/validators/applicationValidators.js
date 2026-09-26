import { z } from 'zod';

export const createApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  accessibilityMode: z.enum(['standard', 'simplified', 'voice', 'keyboard']).optional(),
  applicationData: z.record(z.any()).optional(),
});

export const updateApplicationSchema = z.object({
  status: z.enum(['saved', 'started', 'submitted', 'under_review', 'interview', 'offer', 'rejected', 'withdrawn']).optional(),
  accessibilityMode: z.enum(['standard', 'simplified', 'voice', 'keyboard']).optional(),
  applicationData: z.record(z.any()).optional(),
});
