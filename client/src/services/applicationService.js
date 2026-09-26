import { apiRequest } from './api';

export const applicationService = {
  createApplication: (jobId, accessibilityMode, applicationData) =>
    apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify({ jobId, accessibilityMode, applicationData }),
    }),

  getApplications: () => apiRequest('/applications'),

  getApplicationById: (id) => apiRequest(`/applications/${id}`),

  updateApplication: (id, updates) =>
    apiRequest(`/applications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  confirmSubmit: (id) =>
    apiRequest(`/applications/${id}/confirm-submit`, {
      method: 'POST',
    }),
};
