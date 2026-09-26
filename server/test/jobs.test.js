import { describe, it, expect } from 'vitest';
import { getJobs, getJobById } from '../src/services/jobs/jobService.js';

describe('Job Search & Detail Unit Tests', () => {
  it('should fetch seed jobs when filtered by keyword', async () => {
    const jobs = await getJobs({ q: 'Java' });
    expect(jobs.length).toBeGreaterThan(0);
    expect(jobs[0].title).toContain('Java');
  });

  it('should return a specific job by ID', async () => {
    const job = await getJobById('66e1a0000000000000000001');
    expect(job).toBeDefined();
    expect(job.company).toBe('NovaByte Technologies');
  });
});
