import { describe, it, expect } from 'vitest';
import { explainJob } from '../src/services/ai/jobExplanationService.js';
import { matchJobWithResume } from '../src/services/ai/jobMatchService.js';
import { translateQuestion } from '../src/services/ai/applicationTranslatorService.js';
import { SEED_JOBS, SEED_DEMO_RESUME } from '../src/utils/seedData.js';

describe('AI Core Service Unit Tests', () => {
  it('should generate structured job explanation with fallback', async () => {
    const job = SEED_JOBS[0];
    const explanation = await explainJob(job);
    expect(explanation).toBeDefined();
    expect(explanation.summary).toBeDefined();
    expect(explanation.mustHaveSkills.length).toBeGreaterThan(0);
  });

  it('should perform evidence-based job matching', async () => {
    const job = SEED_JOBS[0];
    const match = await matchJobWithResume(job, SEED_DEMO_RESUME);
    expect(match.matchedRequirements.length).toBeGreaterThan(0);
    expect(match.explanation).toBeDefined();
  });

  it('should translate application question while preserving legal meaning', async () => {
    const translation = await translateQuestion('Are you legally authorized to work in the jurisdiction associated with this position?');
    expect(translation.original).toBeDefined();
    expect(translation.plainLanguageExplanation).toContain('legal permission');
  });
});
