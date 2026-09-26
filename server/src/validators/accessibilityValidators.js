import { z } from 'zod';

export const accessibilityProfileSchema = z.object({
  voiceEnabled: z.boolean().optional(),
  keyboardFirst: z.boolean().optional(),
  screenReaderOptimized: z.boolean().optional(),
  highContrast: z.boolean().optional(),
  reducedMotion: z.boolean().optional(),
  fontScale: z.number().min(0.8).max(2.0).optional(),
  voiceSpeed: z.number().min(0.5).max(2.0).optional(),
  preferredLanguage: z.string().optional(),
});
