import { describe, it, expect } from 'vitest';
import { getBarrierReportForJob } from '../src/services/barrier/barrierAnalysisService.js';

describe('BarrierLens & Accessibility Unit Tests', () => {
  it('should generate valid barrier report for seed job', async () => {
    const report = await getBarrierReportForJob('66e1a0000000000000000001');
    expect(report.voiceSupport).toBe('supported');
    expect(report.keyboardSupport).toBe('supported');
    expect(report.confidence).toBeGreaterThan(0.5);
  });
});
