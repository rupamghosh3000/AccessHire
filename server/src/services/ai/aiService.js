import { explainJob } from './jobExplanationService.js';
import { matchJobWithResume } from './jobMatchService.js';
import { translateQuestion } from './applicationTranslatorService.js';
import { handleAssistantQuery } from './assistantService.js';

export const aiService = {
  explainJob,
  matchJobWithResume,
  translateQuestion,
  handleAssistantQuery,
};
