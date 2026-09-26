import { apiRequest } from './api';

export const jobService = {
  getJobs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  getJobById: (id) => apiRequest(`/jobs/${id}`),

  saveJob: (id) =>
    apiRequest(`/jobs/${id}/save`, {
      method: 'POST',
    }),

  unsaveJob: (id) =>
    apiRequest(`/jobs/${id}/save`, {
      method: 'DELETE',
    }),

  getSavedJobs: () => apiRequest('/jobs/saved'),
};
