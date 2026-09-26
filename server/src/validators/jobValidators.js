import { z } from 'zod';

export const jobQuerySchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  workMode: z.enum(['remote', 'hybrid', 'onsite', 'all']).optional(),
  experience: z.string().optional(),
  skill: z.string().optional(),
});
