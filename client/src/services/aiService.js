import { apiRequest } from './api';

export const aiService = {
  explainJob: (jobId) =>
    apiRequest('/ai/job-explain', {
      method: 'POST',
      body: JSON.stringify({ jobId }),
    }),

  matchJob: (jobId, resumeId) =>
    apiRequest('/ai/job-match', {
      method: 'POST',
      body: JSON.stringify({ jobId, resumeId }),
    }),

  translateQuestion: (originalText, context) =>
    apiRequest('/ai/translate', {
      method: 'POST',
      body: JSON.stringify({ originalText, context }),
    }),

  askAssistant: (query, context) =>
    apiRequest('/ai/assistant', {
      method: 'POST',
      body: JSON.stringify({ query, context }),
    }),

  extractResume: () =>
    apiRequest('/ai/extract-resume', {
      method: 'POST',
    }),
};
