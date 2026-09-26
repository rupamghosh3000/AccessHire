import { describe, it, expect } from 'vitest';
import { SEED_DEMO_USER } from '../src/utils/seedData.js';

describe('Authentication & Session Unit Tests', () => {
  it('should validate demo user credentials correctly', () => {
    expect(SEED_DEMO_USER.email).toBe('demo@accesshire.ai');
    expect(SEED_DEMO_USER.passwordPlain).toBe('Password123!');
  });
});
