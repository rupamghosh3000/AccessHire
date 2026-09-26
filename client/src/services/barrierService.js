import { apiRequest } from './api';

export const barrierService = {
  getReport: (jobId) => apiRequest(`/jobs/${jobId}/barrier-report`),
  refreshReport: (jobId) =>
    apiRequest(`/jobs/${jobId}/barrier-report/refresh`, {
      method: 'POST',
    }),
  getPreview: (jobId) => apiRequest(`/jobs/${jobId}/application-preview`),
};
